// http://www.emanueleferonato.com/2015/04/23/how-to-lock-orientation-in-your-html5-responsive-game-using-phaser/

var general_size_x = 192.0
var general_size_y = 108.0

if ((window.innerWidth/window.innerHeight) > (general_size_x / general_size_y))
{
  final_height = Math.ceil(window.innerHeight / (window.innerHeight / general_size_y));
  final_width  = (general_size_x / general_size_y) * final_height;
  final_zoom   = window.innerHeight / general_size_y;
}
else
{
  final_width  = (window.innerWidth / (window.innerWidth / general_size_x));
  final_height = (general_size_y / general_size_x) * final_width;
  final_zoom   = window.innerWidth  / general_size_x;
}

config = {
  type:     Phaser.WEBGL,
  width:    final_width,
  height:   final_height,
  zoom:     final_zoom,
  pixelArt: true,
  backgroundColor: '#502d69',
  parent: 'test',

  scene: {
    preload: preload,
    create:  create,
    update:  update
  }
};


function recalculate_dimensions()
{
  if ((window.innerWidth/window.innerHeight) > (general_size_x / general_size_y))
  {
    final_height = Math.ceil(window.innerHeight / (window.innerHeight / general_size_y));
    final_width  = (general_size_x / general_size_y) * final_height;
    final_zoom   = window.innerHeight / general_size_y;
  }
  else
  {
    final_width  = (window.innerWidth / (window.innerWidth / general_size_x));
    final_height = (general_size_y / general_size_x) * final_width;
    final_zoom   = window.innerWidth  / general_size_x;
  }

  config = {
    type:     Phaser.WEBGL,
    width:    final_width,
    height:   final_height,
    zoom:     final_zoom,
    pixelArt: true, backgroundColor:'#502d69', parent:'test',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
}


var this_create;
var text3;

lista_dialogos = [
  "",
  "Hi, I'm death !",
  "Well...",
  "Hello there !",
  "Oh, so you want to learn\n about how did\n #gamergate begin ?",
  "Yeah... well, it's a topic\n rather complex you know ?",
  "Yes, let me tell you the \nwhole story",
  "Once upon a time there was\n a nice game dev called\n Zoe Quinn",
  "She was worried about a\n particular forum\n called wizardchan",
  "And so",
  "She decided to make a \ngame for those users",
  "3 months later\n depression quest\n was born",
  "Not that many users\n liked the ideas\n behind that game",
  "But people raged when\n they discovered\n something",
  "She manipulated an\n editor from kotaku\n to get a nice review",
  "So people started\n critizing the game\n",
  "And feminism took\n that as sexism",
  "And so, a complex\n debate started\n",
  "People argued about\n the role of women\n in games",
  "Are most of the games\n wrong ?",
  "Was it fair that\n most of the users\n simply raged at each\n others ?",
  "The questions still \nunanswered",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Easter egg 7u7"
];
int_dialogos = 0;

$(document).bind('keydown', 'space', function () { next_dialog(); });








function next_dialog() {
  text3.setText(lista_dialogos[int_dialogos]);
  int_dialogos++;
}

function preload () {
  this.load.spritesheet('skeleton', 'img/study_please/Skeleton Idle.png', { frameWidth: 24, frameHeight: 32, endFrame: 11 });
  this.load.image('room_background_0', 'img/study_please/room_background_0.png');
}

function create () {
  this_create = this;

  // background of the room
  obj_room_background_0  = this.add.sprite(0, 0, 'room_background_0', 4).setOrigin(0,0).setName("calendar");

  // da skeleton 7u7
  var config = { key: 'skeleton_0', frameRate: 7, repeat: -1,
    frames: this.anims.generateFrameNumbers('skeleton', { start: 0, end: 10, first: 0 }) };
  this.anims.create(config);
  obj_char_0                 = this.add.sprite(12, 66, 'skeleton').setOrigin(0,0).setName("personaje");
  obj_char_0.anims.play('skeleton_0');

  text3 = this.add.text(9, 9, lista_dialogos[int_dialogos]).setFont('14px Arial').setFill('#c9c28f');
}

function update (time, delta)
{
}





















//
