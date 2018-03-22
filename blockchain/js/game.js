

config = {
  type:     Phaser.WEBGL,
  width:    1000,
  height:   500,
  zoom:     1,
  pixelArt: true,
  backgroundColor: '#ffffff',
  parent: 'juego_en_si',

  scene: {
    preload: preload,
    create:  create,
    update:  update
  }
};

function preload () {
  this.load.image('valid', 'img/valid.png');
  this.load.image('block', 'img/block.png');
}

function create ()
{


  var image = this.add.image(50, 50, 'block').setInteractive();
  this.input.setDraggable(image);

  var zone_valid = this.add.image(500, 300, 'valid').setInteractive();
  zone_valid.input.dropZone = true;


  this.input.on('dragstart', function (pointer, gameObject) {
      this.children.bringToTop(gameObject);
  }, this);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
  });

  this.input.on('dragenter', function (pointer, gameObject, dropZone) {
    zone_valid.setTint(0x00ff00);
  });

  this.input.on('dragleave', function (pointer, gameObject, dropZone) {
    zone_valid.clearTint();
  });

  this.input.on('drop', function (pointer, gameObject, dropZone) {
    gameObject.x = dropZone.x;
    gameObject.y = dropZone.y;
    gameObject.setScale(0.2);
    gameObject.input.enabled = false;
    zone_valid.clearTint();
  });

  this.input.on('dragend', function (pointer, gameObject, dropped) {
    // if (!dropped) {
    //     gameObject.x = gameObject.input.dragStartX;
    //     gameObject.y = gameObject.input.dragStartY;
    // }
  });


  //
}

function update (time, delta)
{
}
