import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000
})

// Mock数据
const mockVideoDetail = {
  id: '1',
  title: 'Woman Purple Shower Gel Rose Oud Commercial Product Demo',
  thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=450&fit=crop',
  prompt: {
    style: '明亮、干净的商业广告风格，高饱和度色彩，专业产品摄影，柔和的背景虚化效果，现代简约美学',
    cinematography: {
      camera: '手持静态拍摄，轻微晃动增加真实感',
      lens: '50mm虚拟镜头，浅景深',
      lighting: '柔和的室内自然光，辅以专业补光',
      mood: '愉悦、舒适、自信、诱人、高端'
    },
    scenes: [{
      time: '0s-3.5s',
      description: '一名三十岁左右的女子在明亮的浴室中，手持紫色的玫瑰沐浴露产品，背景是整洁的浴室环境，柔和的自然光线从侧面照射，产品的紫色包装在光线下闪闪发光。女子微笑着展示产品，表情自然舒适。'
    }]
  }
}

export const videoApi = {
  getVideoDetail(id) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockVideoDetail), 300)
    })
  },

  generateVideo(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: 'generated_' + Date.now(),
            thumbnail: 'https://via.placeholder.com/400x712',
            status: 'completed'
          }
        })
      }, 3000)
    })
  }
}
