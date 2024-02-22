// Example in-memory data for beats (for demonstration purposes)
let beats = [
    { id: 1, title: 'Beat 1', artist: 'Artist 1', genre: 'Hip Hop' },
    { id: 2, title: 'Beat 2', artist: 'Artist 2', genre: 'R&B' },
    // Additional beats...
  ];
  
  exports.getAllBeats = () => beats;
  
  exports.createBeat = (newBeat) => {
    const beat = { id: beats.length + 1, ...newBeat };
    beats.push(beat);
    return beat;
  };
  
  exports.getBeatById = (id) => beats.find((beat) => beat.id === parseInt(id));
  
  exports.updateBeat = (id, updatedBeat) => {
    const index = beats.findIndex((beat) => beat.id === parseInt(id));
    if (index !== -1) {
      beats[index] = { ...beats[index], ...updatedBeat };
      return { message: 'Beat updated successfully' };
    }
    return { error: 'Beat not found' };
  };
  
  exports.deleteBeat = (id) => {
    beats = beats.filter((beat) => beat.id !== parseInt(id));
    return { message: 'Beat deleted successfully' };
  };
  