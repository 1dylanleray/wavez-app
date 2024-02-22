import { defineStore } from 'pinia'
import artist from '../artist.json'

export const useBeatStore = defineStore('beat', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null
  }),
  actions: {
    loadBeat(artist, track) {
        this.currentArtist = artist
        this.currentTrack = track

        if (this.audio && this.audio.src) {
            this.audio.pause()
            this.isPlaying = false
            this.audio.src = ''
        }

        this.audio = new Audio()
        this.audio.src = track.path

        setTimeout(() => {
            this.isPlaying = true
            this.audio.play()
        }, 200)
    },

    playOrPauseBeat() {
        if (this.audio.paused) {
            this.isPlaying = true
            this.audio.play()
        } else {
            this.isPlaying = false
            this.audio.pause()
        }
    },

    playOrPauseThisBeat(artist, track) {
        if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)) {
            this.loadBeat(artist, track)
            return
        }

        this.playOrPauseBeat()
    },

    prevBeat(currentTrack) {
        let track = artist.tracks[currentTrack.id - 2]
        this.loadBeat(artist, track)
    },

    nextBeat(currentTrack) {
        if (currentTrack.id === artist.tracks.length) {
            let track = artist.tracks[0]
            this.loadBeat(artist, track)
        } else {
            let track = artist.tracks[currentTrack.id]
            this.loadBeat(artist, track)
        }
    },

    playFromFirst() {
        this.resetState()
        let track = artist.tracks[0]
        this.loadBeat(artist, track)
    },

    resetState() {
        this.isPlaying = false
        this.audio = null
        this.currentArtist = null
        this.currentTrack = null
    }
  },
  persist: true
})