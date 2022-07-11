class Endscreen extends Phaser.Scene {

	constructor() {
		super('endscreen');

		this.press_start;
		this.ggr_logo;
		this.score;
		this.high_score;
		this.score_text;
		this.high_score_text;

	}

	init (data) {
		this.score = data.score;
		this.high_score = data.high_score;

		if (this.score > this.high_score) {
			this.high_score = this.score;
		}
	}

	create() {

		game.events.on('blur', function () {
			this.scene.pause();
		}, this);

		game.events.on('focus', function () {
			this.scene.resume();
		}, this);
		
		this.press_start = this.add_starting_visual(this.add.image(WINDOW_WIDTH/2., WINDOW_HEIGHT*0.75, 'press_start'));
		this.tweens.add({
			targets: this.press_start,
			scaleX: PRESS_START_ZOOM,
			scaleY: PRESS_START_ZOOM,
			ease: 'Sine.easeInOut',
			duration: PRESS_START_PERIOD,
			repeat: -1,
			yoyo: true
		});

		this.ggr_logo = this.add_starting_visual(this.add.image(WINDOW_WIDTH/2., WINDOW_HEIGHT/3., 'ggr_logo'));

		this.input.keyboard.on('keydown_UP', this.restart_dance, this);

		this.score_text = this.add_starting_visual(this.add.text(WINDOW_WIDTH/2., WINDOW_HEIGHT*0.7, `SCORE: ${this.score}`, {
				fontSize: FEEDBACK_FONTSIZE_DEFAULT,
				fill: FEEDBACK_COLOR_DEFAULT
		}));
		this.score_text.setOrigin(0.5,1);
		this.high_score_text = this.add_starting_visual(this.add.text(WINDOW_WIDTH/2., WINDOW_HEIGHT*0.75, `HI-SCORE: ${this.high_score}`, {
			fontSize: FEEDBACK_FONTSIZE_DEFAULT,
			fill: FEEDBACK_COLOR_DEFAULT
		}));
		this.high_score_text.setOrigin(0.5,1);
	}

	add_starting_visual(game_object, alpha=1) {
		game_object.alpha=0;
		this.tweens.add({ targets:game_object, alpha:alpha, duration:1, delay:10});
		return game_object;
	}

	restart_dance() {
		function transition_to_gonddr() {
			this.ggr_logo.destroy();
			this.press_start.destroy();
			this.score_text.destroy();
			this.high_score_text.destroy();

        	this.scene.transition({
				target: 'gonddr',
				duration: 1200,
				moveBelow: true,
				data: {high_score: this.high_score}
			});
		}
		do_checkerboard(this, transition_to_gonddr, this);
	}
}

PRESS_START_Y = 280;
PRESS_START_ZOOM = 0.8;
PRESS_START_PERIOD = 500;
