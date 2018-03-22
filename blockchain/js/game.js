



score_id = "#diapo_6_0";

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

var listaca = [];
var the_static;
var this_create;
var current_color = "";
var puntos = 0;

function preload () {
  this.load.image('valid', 'img/valid.png');
  this.load.image('invalid', 'img/invalid.png');
  this.load.image('block_pink', 'img/block_pink.png');
  this.load.image('block_yellow', 'img/block_yellow.png');
  this.load.image('block_green', 'img/block_green.png');
  this.load.image('block_black', 'img/block_black.png');
  this.load.image('block_blue', 'img/block_blue.png');
  $(score_id).get(0).style.setProperty("text-align", "center");
}

function create ()
{


  this_create = this;

  // var listaca = [];



  // function add_object() {

    // var positiony = 50 + Math.floor(Math.random() * 300);

    // var image = this_create.add.image(50, positiony, 'block').setInteractive();
    // this_create.input.setDraggable(image);
    // listaca.push(image);

    // listaca.push(this_create.add.image(50, positiony, 'block').setInteractive());
    // this_create.input.setDraggable(listaca[listaca.length-1]);

    // setInterval(function() { add_object(); }, 3000);
  // }

  // add_object();

  // the_static = this.add.image(120, 250, 'block_blue');

  // current_color =

  var type_of_block = Math.floor(Math.random() * 5);

  if (type_of_block == 0) { current_color = "pink";the_static = this.add.image(120, 250, 'block_pink'); }
  if (type_of_block == 1) { current_color = "yellow";the_static = this.add.image(120, 250, 'block_yellow'); }
  if (type_of_block == 2) { current_color = "green";the_static = this.add.image(120, 250, 'block_green'); }
  if (type_of_block == 3) { current_color = "black";the_static = this.add.image(120, 250, 'block_black'); }
  if (type_of_block == 4) { current_color = "blue";the_static = this.add.image(120, 250, 'block_blue'); }






  var zone_valid = this.add.image(300, 370, 'valid').setInteractive();
  zone_valid.input.dropZone = true;
  zone_valid["zona"] = "valida";

  var zone_invalid = this.add.image(300, 130, 'invalid').setInteractive();
  zone_invalid.input.dropZone = true;
  zone_invalid["zona"] = "invalida";

  this.input.on('dragstart', function (pointer, gameObject) {
      this.children.bringToTop(gameObject);
  }, this);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
  });

  this.input.on('dragenter', function (pointer, gameObject, dropZone) {
    dropZone.setTint(0x7a7a7a);
  });

  this.input.on('dragleave', function (pointer, gameObject, dropZone) {
    dropZone.clearTint();
  });

  this.input.on('drop', function (pointer, gameObject, dropZone) {
    gameObject.x = dropZone.x;
    gameObject.y = dropZone.y;
    // gameObject.setScale(0.2);
    // console.log(gameObject["color_block"]);
    // console.log(dropZone["zona"]);
    // console.log(current_color);

    if (dropZone["zona"] == "valida") {
      if (gameObject["color_block"] == current_color) {
        puntos += 100;
      }
      else {
        puntos -= 50;
      }
    }

    if (dropZone["zona"] == "invalida") {
      if (gameObject["color_block"] != current_color) {
        puntos += 10;
      }
      else {
        puntos -= 10;
      }
    }

    var type_of_block = Math.floor(Math.random() * 5);

    if (type_of_block == 0) { current_color = "pink";the_static = this_create.add.image(120, 250, 'block_pink'); }
    if (type_of_block == 1) { current_color = "yellow";the_static = this_create.add.image(120, 250, 'block_yellow'); }
    if (type_of_block == 2) { current_color = "green";the_static = this_create.add.image(120, 250, 'block_green'); }
    if (type_of_block == 3) { current_color = "black";the_static = this_create.add.image(120, 250, 'block_black'); }
    if (type_of_block == 4) { current_color = "blue";the_static = this_create.add.image(120, 250, 'block_blue'); }


    if (puntos < 0) {
      // game = new Phaser.Game(config);
      console.log("you've lost");
    }
    // console.log(puntos);

    $(score_id).text("Score :"+puntos);

    gameObject.destroy();
    // gameObject.input.enabled = false;
    // zone_valid.clearTint();
    // zone_invalid.clearTint();
    dropZone.clearTint();
  });

  this.input.on('dragend', function (pointer, gameObject, dropped) {
    // if (!dropped) {
    //     gameObject.x = gameObject.input.dragStartX;
    //     gameObject.y = gameObject.input.dragStartY;
    // }
  });


  //
}


counter = 0;

function update (time, delta)
{
  for (var i = 0; i < listaca.length; i++) {
    listaca[i].x -= 1;
  }

  if (counter % 150 == 0) {
    var positiony = 30 + Math.floor(Math.random() * 370);

    var type_of_block = Math.floor(Math.random() * 5);

    if (type_of_block == 0) {
      var image = this.add.image(1250, positiony, 'block_pink');
      image["color_block"] = "pink";
    }
    if (type_of_block == 1) {
      var image = this.add.image(1250, positiony, 'block_yellow');
      image["color_block"] = "yellow";
    }
    if (type_of_block == 2) {
      var image = this.add.image(1250, positiony, 'block_green');
      image["color_block"] = "green";
    }
    if (type_of_block == 3) {
      var image = this.add.image(1250, positiony, 'block_black');
      image["color_block"] = "black";
    }
    if (type_of_block == 4) {
      var image = this.add.image(1250, positiony, 'block_blue');
      image["color_block"] = "blue";
    }

    image.setInteractive();
    this.input.setDraggable(image);
    listaca.push(image);
  }

  counter++;

}
