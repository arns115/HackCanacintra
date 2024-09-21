let app = document.getElementById('typewriter');

let typewriter = new Typewriter(app, {
  loop: true,
  delay: 75,
});

typewriter
  .pauseFor(300)
  .typeString('<span style="color: #440C22;">Reduce tu huella de carbono.</span>')
  .pauseFor(200)
  .deleteChars(10)
  .start();
  
  
  
  
  
  
