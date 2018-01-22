// http://www.emanueleferonato.com/2015/04/23/how-to-lock-orientation-in-your-html5-responsive-game-using-phaser/

// final_width  = (window.innerWidth  / (window.innerWidth  / 96));

// final_height = Math.ceil(window.innerHeight / (window.innerHeight / 54));
// final_width  = (window.innerWidth  / (window.innerHeight / 54));
// final_width  = (96.0 / 54.0) * final_height;
// final_zoom   = window.innerHeight / 54;

// console.log("|", final_width, "   |", final_height);
// console.log("|", final_width / 96, "   |", final_height / 54);

if ((window.innerWidth/window.innerHeight) > (192.0/108.0))
{
  final_height = Math.ceil(window.innerHeight / (window.innerHeight / 108.0));
  final_width  = (192.0 / 108.0) * final_height;
  final_zoom   = window.innerHeight / 108.0;
}
else
{
  final_width  = (window.innerWidth / (window.innerWidth / 192.0));
  final_height = (108.0 / 192.0) * final_width;
  final_zoom   = window.innerWidth  / 192.0;
}

//console.log("|", window.innerWidth, "   |", window.innerHeight / 54);
// console.log("|", final_width / 96, "   |", final_height / 54);

config = {
  type: Phaser.WEBGL,
  // type: Phaser.CANVAS,
  // width:  window.innerWidth  * window.devicePixelRatio / 17,
  // height: window.innerHeight * window.devicePixelRatio / 17,
  // height: window.innerHeight * window.devicePixelRatio / (Math.floor(window.innerWidth / 96)),

  // width:  window.innerWidth  * window.devicePixelRatio / (Math.floor(window.innerWidth / 96)),
  // height: (window.innerHeight * window.devicePixelRatio / (Math.floor(window.innerHeight / 54)))-1,

  // width:  (window.innerWidth   / (Math.floor(window.innerWidth  / 96))),
  // height: (window.innerHeight  / (Math.floor(window.innerHeight / 54))),

  // width:  (window.innerWidth   / (window.innerWidth  / 96)),
  // height: (window.innerHeight  / (window.innerHeight / 54)),

  width:  final_width,
  height: final_height,
  zoom:   final_zoom,
  // zoom: window.innerWidth / 96,
  // zoom: 1,

  pixelArt: true,
  backgroundColor: '#502d69',
  parent: 'test',

  scene: {
    preload: preload,
    create: create,
    update: update
  }
};


function recalculate_dimensions() {
  if ((window.innerWidth/window.innerHeight) > (96.0/54.0))
  {
    final_height = Math.ceil(window.innerHeight / (window.innerHeight / 54));
    final_width  = (96.0 / 54.0) * final_height;
    final_zoom   = window.innerHeight / 54;
  }
  else
  {
    final_width  = (window.innerWidth / (window.innerWidth / 96));
    final_height = (54.0 / 96.0) * final_width;
    final_zoom   = window.innerWidth  / 96;
  }
  //console.log("|", window.innerWidth, "   |", window.innerHeight);

  config = {
    type:Phaser.WEBGL, width:final_width, height:final_height, zoom:final_zoom,
    pixelArt:true, backgroundColor:'#502d69', parent:'test',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
}




















// var zoom_absolute = Math.floor(window.innerHeight / 54);
// console.log(zoom_absolute);

var libreta_menu_seleccionado = 0;
var shape_libreta;
var this_create;

// states:

// study
// idle
// sleeping_bed
// sleeping_table
var game_char_state   = "idle";
var game_char_state_concentration = 1.0;
var game_char_state_willpower     = 0.7;
var game_char_state_energy        = 1.0;

var game_course;
var game_days         = 0;
var game_year         = 0;
var game_trimester    = 0;
var game_study_target = 0;

var game              = new Phaser.Game(config);
var libreta_sacada    = false;
var isout_panel_stats = false;
var isout_calendar    = false;

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

function preload () {

  this.load.image('alpha_fullscreen', 'img/study_please/alpha_fullscreen.png');
  // this.load.image('skeleton', 'img/study_please/Skeleton Idle.png');
  this.load.spritesheet('skeleton', 'img/study_please/Skeleton Idle.png', { frameWidth: 24, frameHeight: 32, endFrame: 11 });

  this.load.image('menu_where_to_go_0',      'img/study_please/menu_where_to_go_0.png');
  this.load.image('start_screen_0',      'img/study_please/start_screen_0.png');

  this.load.image('stats_panel_0',      'img/study_please/stats_panel_0.png');
  this.load.image('stats_panel_clip_0', 'img/study_please/stats_panel_clip_0.png');

  this.load.image('study_panel_0', 'img/study_please/study_panel_0.png');
  this.load.image('subject_0', 'img/study_please/subject_0.png');

  this.load.image('room_background_0', 'img/study_please/room_background_0.png');
  this.load.image('clock_0', 'img/study_please/clock_0.png');
  this.load.image('table_0', 'img/study_please/table_0.png');
  this.load.image('to_study_0', 'img/study_please/to_study_0.png');
  this.load.image('pills_0', 'img/study_please/pills_0.png');
  this.load.image('computer_0', 'img/study_please/computer_0.png');
  this.load.image('bed_0', 'img/study_please/bed_0.png');

  this.load.image(      'char_0',          'img/study_please/char_0.png');
  this.load.spritesheet('char_animated_0', 'img/study_please/char_animated_0.png', { frameWidth: 22, frameHeight: 44, endFrame: 4 });
  this.load.spritesheet('char_animated_1', 'img/study_please/char_animated_1.png', { frameWidth: 22, frameHeight: 44, endFrame: 4 });
  this.load.spritesheet('char_animated_2', 'img/study_please/char_animated_2.png', { frameWidth: 22, frameHeight: 44, endFrame: 4 });

  this.load.image('notebook_back', 'img/study_please/notebook_back.png');
  this.load.image('notebook_0',    'img/study_please/notebook_0.png'   );
  this.load.image('notebook_1',    'img/study_please/notebook_1.png'   );
  this.load.image('notebook_2',    'img/study_please/notebook_2.png'   );

  this.load.image('spr_calendar_subject_0', 'img/study_please/calendar_subject_0.png');
  this.load.image('spr_calendar_subject_1', 'img/study_please/calendar_subject_1.png');
  this.load.image('spr_calendar_subject_2', 'img/study_please/calendar_subject_2.png');
  this.load.image('spr_calendar_subject_3', 'img/study_please/calendar_subject_3.png');

  this.load.image('calendar_big_0', 'img/study_please/calendar_big_0.png');
  this.load.image('title_0', 'img/study_please/title_0.png');
  this.load.image('spr_x_cross', 'img/study_please/x_cross.png');
  this.load.image('spr_x_cross_1', 'img/study_please/x_cross_1.png');

  map_0_1 = this.make.tilemap({ width: 11, height: 11, tileWidth: 16, tileHeight: 16 });
}


// $(document).bind('keydown', 'space', function () { text3.text = lista_dialogos[1]; });
$(document).bind('keydown', 'space', function () { int_dialogos++; text3.setText(lista_dialogos[int_dialogos]); });


function create ()
{
  this_create = this;
  obj_room_background_0  = this.add.sprite(0, 0, 'room_background_0', 4).setOrigin(0,0).setName("calendar");

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
