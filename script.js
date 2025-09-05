// Example JSON file path: songs.json
fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    const serviceDateElement = document.getElementById('service-date');
    if (serviceDateElement) {
      serviceDateElement.textContent = data.serviceDate;
    }

    // Populate psalm readings if available
    if (data.psalmReadings) {
      data.psalmReadings.forEach((psalm, index) => {
        const psalmElement = document.getElementById(`psalm-${index + 1}`);
        if (psalmElement) {
          psalmElement.textContent = `Scripture Reading - ${psalm}`;
        }
      });
    }
  })
  .catch(error => {
    console.error('Error fetching service date or psalms:', error);
  });

document.addEventListener("DOMContentLoaded", () => {
  const songsContainer = document.querySelector(".songs-container");
  const orderItems = document.querySelectorAll(".song-order");
  const announcementsContainer = document.querySelector(".announcements-container");

  fetch("songs.json")
    .then(res => res.json())
    .then(data => {
      const { songs, announcements } = data;

      // Populate Order of Worship song titles
      orderItems.forEach(li => {
        const index = parseInt(li.dataset.index);
        if (songs[index]) {
          li.textContent = songs[index].title;
        }
      });

      // Populate Songs & Lyrics section
      if (songsContainer) {
        songs.forEach(song => {
          const details = document.createElement("details");
          details.classList.add("song");

          const summary = document.createElement("summary");
          summary.textContent = song.title;

          const pre = document.createElement("pre");
          pre.textContent = song.lyrics;

          details.appendChild(summary);
          details.appendChild(pre);
          songsContainer.appendChild(details);
        });
      }

      // Populate Announcements
      if (announcementsContainer) {
        announcements.forEach(text => {
          const li = document.createElement("li");
          li.textContent = text;
          announcementsContainer.appendChild(li);
        });
      }
    })
    .catch(err => console.error("Failed to load songs or announcements:", err));
});
