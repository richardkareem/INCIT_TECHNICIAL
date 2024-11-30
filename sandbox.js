function bfsLabirin(labirin) {
    const rows = labirin.length;
    const cols = labirin[0].length;
  
    // Menentukan arah pergerakan (atas, bawah, kiri, kanan)
    const directions = [
      [-1, 0], // atas
      [1, 0],  // bawah
      [0, -1], // kiri
      [0, 1],  // kanan
    ];
  
    // Mencari posisi start (S) dan finish (F)
    let start = null;
    let finish = null;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (labirin[i][j] === 'S') start = [i, j];
        if (labirin[i][j] === 'F') finish = [i, j];
      }
    }
  
    // Queue untuk BFS, menyimpan posisi dan langkah yang sudah diambil
    const queue = [[...start, 0]]; // [x, y, langkah]
    console.log("queue: ", queue)
      /**
        [
            [false], [false], [false]
            ...
        ]
        **/
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  
    //mulai dari 0
    visited[start[0]][start[1]] = true;
    // Melakukan BFS
    while (queue.length > 0) {
      const [x, y, steps] = queue.shift();
    //  console.log({x},{y},{steps})
      // Jika sudah sampai finish, kembalikan jumlah langkah
      if (x === finish[0] && y === finish[1]) {
        return steps;
      }
  
      // Mengeksplorasi tetangga
      for (const [dx, dy] of directions) {
        console.log({dx}, {dy}, directions)
        const newX = x + dx;
        const newY = y + dy;
  
        // Periksa apakah posisi valid dan belum dikunjungi
        if (newX >= 0 && newX < rows && newY >= 0 && newY < cols &&
            labirin[newX][newY] !== 1 && !visited[newX][newY]) {
          visited[newX][newY] = true;
          queue.push([newX, newY, steps + 1]);
        }
      }
    }
  
    return -1; // Jika tidak ada jalur yang ditemukan
  }
  
  // Contoh penggunaan
  const labirin = [
    ['S', 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 1, 'F']
  ];
  
  console.log("Jumlah langkah terpendek:", bfsLabirin(labirin)); // Output: 7
  