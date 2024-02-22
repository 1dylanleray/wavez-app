import { shallowMount } from '@vue/test-utils';
import MusicPlayer from '../components/MusicPlayer.vue'

describe('MusicPlayer.vue', () => {
  it('renders player component', () => {
    const wrapper = shallowMount(MusicPlayer);
    expect(wrapper.exists()).toBe(true);
  });

  it('starts playing when play button is clicked', async () => {
    const wrapper = shallowMount(MusicPlayer);
    await wrapper.find('.play-button').trigger('click');
    expect(wrapper.emitted().play).toBeTruthy();
  });

  it('pauses when pause button is clicked', async () => {
    const wrapper = shallowMount(MusicPlayer);
    await wrapper.setData({ isPlaying: true });
    await wrapper.find('.pause-button').trigger('click');
    expect(wrapper.emitted().pause).toBeTruthy();
  });

  it('displays current song title', () => {
    const songTitle = 'Sample Song';
    const wrapper = shallowMount(MusicPlayer, {
      propsData: { currentSong: { title: songTitle } }
    });
    expect(wrapper.find('.song-title').text()).toMatch(songTitle);
  });
});
