<template>
  <div class="main-content">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb-wrapper" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>灵感广场</el-breadcrumb-item>
      <el-breadcrumb-item>{{ video?.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 两列布局 -->
    <div class="two-column-layout">
      <!-- 左侧：视频/参考图 -->
      <div class="left-panel">
        <el-image
          :src="video?.thumbnail"
          fit="cover"
          class="video-thumbnail"
        >
          <template #error>
            <div class="image-error">
              <el-icon :size="48"><Picture /></el-icon>
              <span class="error-text">无法加载视频缩略图</span>
            </div>
          </template>
          <template #placeholder>
            <div class="image-placeholder">
              <el-icon class="is-loading" :size="48"><Loading /></el-icon>
            </div>
          </template>
        </el-image>
      </div>

      <!-- 右侧：详情 -->
      <div class="right-panel">
        <h1 class="video-title">{{ video?.title }}</h1>

        <div class="reference-image-section">
          <h3 class="section-title">参考图（首帧）</h3>
          <el-image
            :src="video?.thumbnail"
            class="reference-image"
            fit="cover"
          >
            <template #error>
              <div class="image-error-small">
                <el-icon :size="32"><Picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>

        <div class="prompt-section">
          <h3 class="section-title">提示词</h3>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="风格" name="style">
              <p class="prompt-content">{{ video?.prompt?.style || '暂无风格描述' }}</p>
            </el-collapse-item>
            <el-collapse-item title="电影摄影" name="cinematography">
              <div class="cinematography-details">
                <p><strong>摄像机：</strong>{{ video?.prompt?.cinematography?.camera || '未设置' }}</p>
                <p><strong>镜头：</strong>{{ video?.prompt?.cinematography?.lens || '未设置' }}</p>
                <p><strong>灯光：</strong>{{ video?.prompt?.cinematography?.lighting || '未设置' }}</p>
                <p><strong>情绪：</strong>{{ video?.prompt?.cinematography?.mood || '未设置' }}</p>
              </div>
            </el-collapse-item>
            <el-collapse-item title="场景描述" name="scene">
              <div class="scene-details">
                <p><strong>场景1 ({{ video?.prompt?.scenes?.[0]?.time || '0s-3.5s' }}):</strong></p>
                <p class="prompt-content">{{ video?.prompt?.scenes?.[0]?.description || '暂无场景描述' }}</p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="action-buttons">
          <el-button @click="handleCopyPrompt">
            <el-icon class="button-icon"><DocumentCopy /></el-icon>
            复制提示词
          </el-button>
          <el-button @click="handleShare">
            <el-icon class="button-icon"><Share /></el-icon>
            分享
          </el-button>
          <el-button type="primary" @click="handleCreateSameStyle">
            <el-icon class="button-icon"><Plus /></el-icon>
            创作同款
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideoStore } from '@/stores/video'
import { videoApi } from '@/api/video'
import { ElMessage } from 'element-plus'
import { Picture, Loading, DocumentCopy, Share, Plus } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const videoStore = useVideoStore()

const video = ref(null)
const activeNames = ref(['style', 'cinematography', 'scene'])

onMounted(async () => {
  try {
    const videoId = route.params.id
    const data = await videoApi.getVideoDetail(videoId)
    video.value = data
    videoStore.setCurrentVideo(data)
  } catch (error) {
    ElMessage.error('加载视频详情失败')
    console.error('Failed to load video detail:', error)
  }
})

const handleCopyPrompt = () => {
  if (!video.value?.prompt) {
    ElMessage.warning('暂无提示词可复制')
    return
  }

  try {
    const promptText = JSON.stringify(video.value.prompt, null, 2)
    navigator.clipboard.writeText(promptText)
    ElMessage.success('提示词已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败，请手动复制')
    console.error('Copy failed:', error)
  }
}

const handleShare = () => {
  ElMessage.info('分享功能开发中...')
}

const handleCreateSameStyle = () => {
  if (!video.value) {
    ElMessage.warning('无法获取视频信息')
    return
  }

  try {
    videoStore.initCreateFormFromVideo(video.value)
    router.push({
      path: '/create',
      query: {
        videoId: video.value.id,
        prompt: JSON.stringify(video.value.prompt)
      }
    })
  } catch (error) {
    ElMessage.error('跳转失败')
    console.error('Navigation failed:', error)
  }
}
</script>

<style scoped>
.breadcrumb-wrapper {
  margin-bottom: 24px;
  padding: 12px 0;
}

.left-panel {
  position: sticky;
  top: 100px;
  align-self: start;
}

.video-thumbnail {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  min-height: 400px;
  background-color: var(--bg-secondary);
}

.image-error,
.image-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  gap: 12px;
}

.error-text {
  font-size: 14px;
  color: var(--text-secondary);
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.video-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.4;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 12px 0;
  color: var(--text-primary);
}

.reference-image-section {
  margin-bottom: 8px;
}

.reference-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  min-height: 225px;
  background-color: var(--bg-secondary);
}

.image-error-small {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 225px;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
}

.prompt-section {
  padding: 24px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-light);
}

.prompt-content {
  color: var(--text-regular);
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.cinematography-details p {
  margin: 12px 0;
  line-height: 1.6;
  color: var(--text-regular);
}

.cinematography-details p:first-child {
  margin-top: 0;
}

.cinematography-details p:last-child {
  margin-bottom: 0;
}

.scene-details p {
  margin: 8px 0;
  line-height: 1.6;
}

.scene-details p:first-child {
  margin-top: 0;
}

.scene-details p:last-child {
  margin-bottom: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.action-buttons .el-button {
  display: flex;
  align-items: center;
  gap: 6px;
}

.button-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .two-column-layout {
    grid-template-columns: 1fr;
  }

  .left-panel {
    position: static;
  }

  .video-title {
    font-size: 24px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .el-button {
    width: 100%;
    justify-content: center;
  }
}

/* 折叠面板样式优化 */
.prompt-section :deep(.el-collapse) {
  border: none;
}

.prompt-section :deep(.el-collapse-item__header) {
  background-color: transparent;
  border: none;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.prompt-section :deep(.el-collapse-item__wrap) {
  background-color: transparent;
  border: none;
}

.prompt-section :deep(.el-collapse-item__content) {
  padding: 0 0 12px 0;
  color: var(--text-regular);
}
</style>
