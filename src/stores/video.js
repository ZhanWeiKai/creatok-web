import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    currentVideo: null,
    createForm: {
      referenceImage: null,
      prompt: '',
      tags: [],
      aspectRatio: '9:16',
      duration: '15秒',
      quality: '标清',
      generateCount: 1
    },
    generationStatus: {
      isGenerating: false,
      progress: 0,
      result: null
    }
  }),

  actions: {
    setCurrentVideo(video) {
      this.currentVideo = video
    },

    initCreateFormFromVideo(video) {
      // Convert prompt object to JSON string for storage
      this.createForm.prompt = typeof video.prompt === 'string'
        ? video.prompt
        : JSON.stringify(video.prompt, null, 2)
      this.createForm.tags = ['商业广告', '产品展示']
    },

    updateCreateForm(field, value) {
      this.createForm[field] = value
    },

    startGeneration() {
      this.generationStatus.isGenerating = true
      this.generationStatus.progress = 0
    },

    updateProgress(progress) {
      this.generationStatus.progress = progress
    },

    completeGeneration(result) {
      this.generationStatus.isGenerating = false
      this.generationStatus.progress = 100
      this.generationStatus.result = result
    }
  }
})
