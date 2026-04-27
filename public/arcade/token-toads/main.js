const config = {
  type: Phaser.AUTO,
  width: 416,
  height: 480,
  backgroundColor: '#303a2b',
  physics: { default: 'arcade' },
  scene: {
    preload,
    create,
    update,
  },
};

let player, cursors, lanes = [];

function preload() {
  this.load.image('frog', 'assets/frog.png');
  this.load.image('block', 'assets/block.png');
}

function create() {
  player = this.physics.add.sprite(config.width/2, config.height - 40, 'frog').setScale(0.7);

  cursors = this.input.keyboard.createCursorKeys();

  for (let i = 0; i < 4; i++) {
    let lane = this.physics.add.group();
    for (let j = 0; j < 6; j++) {
      let block = lane.create(j*80, 90 + i * 80, 'block').setScale(0.8);
      block.body.velocity.x = 80 + i*20 * (i % 2 === 0 ? 1 : -1);
    }
    lanes.push(lane);
  }

  lanes.forEach(lane =>
    this.physics.add.collider(player, lane, () => {
      player.setPosition(config.width/2, config.height - 40);
    })
  );
}

function update() {
  if (Phaser.Input.Keyboard.JustDown(cursors.left)) player.x -= 40;
  if (Phaser.Input.Keyboard.JustDown(cursors.right)) player.x += 40;
  if (Phaser.Input.Keyboard.JustDown(cursors.up)) player.y -= 40;
  if (Phaser.Input.Keyboard.JustDown(cursors.down)) player.y += 40;

  for (let lane of lanes) {
    lane.children.iterate(block => {
      if (block.x > config.width + 32) block.x = -32;
      if (block.x < -32) block.x = config.width + 32;
    });
  }

  if (player.y < 40) {
    player.setPosition(config.width/2, config.height - 40);
  }
}

const game = new Phaser.Game(config);
