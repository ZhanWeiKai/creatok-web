<template>
  <div class="main-content">
    <div class="page-header">
      <h1 class="page-title">基于 OpenAI Sora 2</h1>
      <p class="page-subtitle">最佳 Sora 2 电商视频生成器，无水印</p>
      <p class="page-description">上传商品图，描述想要表达的视频内容，真实感交给我们来呈现。</p>
    </div>

    <div class="two-column-layout">
      <!-- 左侧：参考图上传 -->
      <div class="left-panel">
        <el-upload
          class="upload-area"
          drag
          :action="uploadUrl"
          :before-upload="beforeUpload"
          :on-success="handleUploadSuccess"
          :show-file-list="false"
          accept="image/*"
        >
          <div v-if="!uploadedImage" class="upload-placeholder">
            <el-icon class="upload-icon"><UploadFilled /></el-icon>
            <p class="upload-text">拖拽图片到此处或点击上传</p>
            <p class="upload-hint">支持 JPG、PNG、GIF，最大 5MB</p>
          </div>
          <img v-else :src="uploadedImage" class="uploaded-image" />
        </el-upload>
      </div>

      <!-- 右侧：提示词编辑 -->
      <div class="right-panel">
        <div class="prompt-editor">
          <el-input
            v-model="promptText"
            type="textarea"
            :rows="12"
            placeholder="请描述您想要生成的视频内容..."
            maxlength="8000"
            show-word-limit
          />

          <el-button @click="enhancePrompt" class="enhance-btn">
            <el-icon><MagicStick /></el-icon>
            提示词增强
          </el-button>
        </div>

        <!-- 标签区域 -->
        <div class="tags-section">
          <div class="tags-list">
            <el-tag
              v-for="tag in tags"
              :key="tag"
              closable
              @close="removeTag(tag)"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="inputRef"
              v-model="inputValue"
              size="small"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
              class="tag-input"
            />
            <el-button v-else size="small" @click="showInput">+ 添加标签</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频设置 -->
    <div class="video-settings">
      <el-form :inline="true">
        <el-form-item label="比例">
          <el-select v-model="aspectRatio" placeholder="请选择">
            <el-option label="9:16 (竖屏)" value="9:16" />
            <el-option label="16:9 (横屏)" value="16:9" />
            <el-option label="1:1 (方形)" value="1:1" />
          </el-select>
        </el-form-item>
        <el-form-item label="时长">
          <el-select v-model="duration" placeholder="请选择">
            <el-option label="15秒" value="15秒" />
            <el-option label="30秒" value="30秒" />
            <el-option label="60秒" value="60秒" />
          </el-select>
        </el-form-item>
        <el-form-item label="清晰度">
          <el-select v-model="quality" placeholder="请选择">
            <el-option label="标清" value="标清" />
            <el-option label="高清" value="高清" />
            <el-option label="超清" value="超清" />
          </el-select>
        </el-form-item>
        <el-form-item label="生成数量">
          <el-select v-model="generateCount" placeholder="请选择">
            <el-option label="1条" :value="1" />
            <el-option label="3条" :value="3" />
            <el-option label="5条" :value="5" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 生成按钮 -->
    <div class="generate-section">
      <el-button
        type="primary"
        size="large"
        @click="generateVideo"
        :loading="isGenerating"
        :disabled="!canGenerate"
      >
        {{ isGenerating ? '生成中...' : '生成视频' }}
      </el-button>

      <el-progress
        v-if="isGenerating"
        :percentage="progress"
        :status="progressStatus"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useVideoStore } from '@/stores/video'
import { videoApi } from '@/api/video'
import { ElMessage } from 'element-plus'
import { UploadFilled, MagicStick } from '@element-plus/icons-vue'

const route = useRoute()
const videoStore = useVideoStore()

// 表单数据
const promptText = ref('')
const uploadedImage = ref(null)
const tags = ref([])
const aspectRatio = ref('9:16')
const duration = ref('15秒')
const quality = ref('标清')
const generateCount = ref(1)

// 标签输入
const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref(null)

// 生成状态
const isGenerating = ref(false)
const progress = ref(0)

// 上传URL（mock）
const uploadUrl = ref('/api/upload')

// 计算属性
const canGenerate = computed(() => {
  return promptText.value.trim().length > 0
})

const progressStatus = computed(() => {
  if (progress.value === 100) return 'success'
  return null
})

// 生命周期
onMounted(() => {
  // 从URL或store读取数据
  if (videoStore.createForm.prompt) {
    promptText.value = videoStore.createForm.prompt
  } else if (route.query.prompt) {
    promptText.value = typeof route.query.prompt === 'string'
      ? route.query.prompt
      : JSON.stringify(route.query.prompt)
  }

  if (videoStore.createForm.tags.length > 0) {
    tags.value = videoStore.createForm.tags
  }

  // 从store读取其他表单数据
  if (videoStore.createForm.aspectRatio) {
    aspectRatio.value = videoStore.createForm.aspectRatio
  }
  if (videoStore.createForm.duration) {
    duration.value = videoStore.createForm.duration
  }
  if (videoStore.createForm.quality) {
    quality.value = videoStore.createForm.quality
  }
  if (videoStore.createForm.generateCount) {
    generateCount.value = videoStore.createForm.generateCount
  }
})

// 方法
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB！')
    return false
  }

  // 本地预览
  uploadedImage.value = URL.createObjectURL(file)
  videoStore.updateCreateForm('referenceImage', file)
  return false // 阻止自动上传
}

const handleUploadSuccess = (response, file) => {
  // 上传成功后的处理（如果需要真实上传）
  uploadedImage.value = URL.createObjectURL(file.raw)
  videoStore.updateCreateForm('referenceImage', file.raw)
  ElMessage.success('图片上传成功')
}

const enhancePrompt = () => {
  // 模拟提示词增强
  const currentPrompt = promptText.value.trim()
  const enhancedText = `${currentPrompt}

**风格:** ${currentPrompt ? '明亮、干净的商业广告风格' : ''}
**电影摄影:**
**摄像机:** 手持静态拍摄，平视视角
**镜头:** 50mm虚拟镜头，景深适中
**灯光:** 柔和的室内自然光
**情绪:** 愉悦、舒适、诱人`.trim()

  promptText.value = enhancedText
  videoStore.updateCreateForm('prompt', enhancedText)
  ElMessage.success('提示词已增强')
}

const removeTag = (tag) => {
  tags.value = tags.value.filter(t => t !== tag)
  videoStore.updateCreateForm('tags', tags.value)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    if (!tags.value.includes(inputValue.value)) {
      tags.value.push(inputValue.value)
      videoStore.updateCreateForm('tags', tags.value)
    }
    inputValue.value = ''
  }
  inputVisible.value = false
}

const generateVideo = async () => {
  if (!canGenerate.value) {
    ElMessage.warning('请先输入提示词')
    return
  }

  // 验证参考图（可选，根据需求调整）
  if (!uploadedImage.value) {
    ElMessage.warning('建议上传参考图片以获得更好的效果')
    // 不return，允许继续
  }

  isGenerating.value = true
  progress.value = 0

  // 同步表单数据到store
  videoStore.updateCreateForm('prompt', promptText.value)
  videoStore.updateCreateForm('tags', tags.value)
  videoStore.updateCreateForm('aspectRatio', aspectRatio.value)
  videoStore.updateCreateForm('duration', duration.value)
  videoStore.updateCreateForm('quality', quality.value)
  videoStore.updateCreateForm('generateCount', generateCount.value)

  videoStore.startGeneration()

  try {
    // 模拟进度
    const interval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 10
        videoStore.updateProgress(progress.value)
      }
    }, 500)

    // 调用API
    const result = await videoApi.generateVideo({
      prompt: promptText.value,
      tags: tags.value,
      aspectRatio: aspectRatio.value,
      duration: duration.value,
      quality: quality.value,
      count: generateCount.value
    })

    clearInterval(interval)
    progress.value = 100
    videoStore.completeGeneration(result)

    ElMessage.success('视频生成成功！')
  } catch (error) {
    ElMessage.error('视频生成失败，请重试')
    console.error('Generation error:', error)
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.page-description {
  font-size: 14px;
  color: var(--text-secondary);
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background-color: var(--bg-secondary);
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: var(--primary-color);
  background-color: #ECF5FF;
}

.upload-placeholder {
  padding: 20px;
}

.upload-icon {
  font-size: 48px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 12px;
  color: var(--text-secondary);
}

.uploaded-image {
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
}

.prompt-editor {
  margin-bottom: 20px;
}

.enhance-btn {
  margin-top: 12px;
  width: 100%;
}

.tags-section {
  margin-top: 20px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.tag-item {
  margin: 0;
}

.tag-input {
  width: 100px;
}

.video-settings {
  margin-top: 32px;
  padding: 24px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
}

.video-settings .el-form-item {
  margin-bottom: 0;
}

.generate-section {
  margin-top: 32px;
  text-align: center;
}

.generate-section .el-button {
  min-width: 200px;
  height: 50px;
  font-size: 18px;
}

.generate-section .el-progress {
  margin-top: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .upload-area {
    padding: 20px;
  }

  .video-settings .el-form {
    display: block;
  }

  .video-settings .el-form-item {
    display: block;
    margin-right: 0;
    margin-bottom: 16px;
  }

  .video-settings .el-select {
    width: 100%;
  }

  .generate-section .el-button {
    width: 100%;
    min-width: auto;
  }
}
</style>
