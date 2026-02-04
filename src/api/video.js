import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000
})

// Mock数据
const mockVideoDetail = {
  id: '1',
  title: 'Woman Purple Shower Gel Rose Oud Commercial Product Demo',
  thumbnail: 'https://via.placeholder.com/400x225',
  prompt: {
    style: '明亮、干净的商业广告风格...',
    cinematography: {
      camera: '手持静态拍摄',
      lens: '50mm虚拟镜头',
      lighting: '柔和的室内自然光',
      mood: '愉悦、舒适、自信、诱人'
    },
    scenes: [{
      time: '0s-3.5s',
      description: '一名三十岁左右的女子...'
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
