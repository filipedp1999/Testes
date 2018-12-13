<template>
  <div>
    <div v-for="herox in all_heroes">
      <div :class="'hero '+herox.color" :id="'hero'+herox.id">{{herox.name}} // {{herox.id}}</div>
    </div>

    <input class="controles" v-model="hero_selected" type="number" id>
  </div>
</template>

<script>
export default {
  name: "Level",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      hero: false,
      all_heroes: [],
      hero_selected: 1,
      speed_boost: 10
    };
  },
  computed: {},
  beforeCreate() {},
  methods: {
    load_hero: function(id, callback) {
      var base_url = "http://192.168.17.20:3000/";
      this.$http
        .get(base_url + "heroes/" + "?id=" + this.hero_selected)
        .then(res => {
          this.hero = res.body[0];
          callback();
        });
    },
    get_postion: function() {
      var base_url = "http://192.168.17.20:3000/";
      Vue.$http.get(base_url + "heroes/").then(res => {
        res.body.forEach(function(xherox) {
          $("#hero" + xherox.id).css(
            {
              top: xherox.position[0],
              left: xherox.position[1]
            },
            10
          );
          console.log(xherox);
        });
      });
    },
    running: function() {
      let Vue = this;
      window.setInterval(function() {
        var base_url = "http://192.168.17.20:3000/";
        Vue.$http.get(base_url + "heroes/").then(res => {
          res.body.forEach(function(xherox) {
            $("#hero" + xherox.id).css(
              {
                top: xherox.position[0],
                left: xherox.position[1]
              },
              10
            );
            console.log(xherox);
          });
        });
      }, 70);
    },
    run: function(callback, running) {
      var base_url = "http://192.168.17.20:3000/";
      this.$http.get(base_url + "heroes/").then(res => {
        this.all_heroes = res.body;
        callback(this.hero_selected, this.accept_commands);
        running();
      });
    },
    accept_commands: function(callback) {
      var base_url = "http://192.168.17.20:3000/";
      let Vue = this;
      $(document).keydown(function(e) {
        console.log($("#hero" + Vue.hero_selected).position());
        switch (e.which) {
          case 37:
            $("#hero" + Vue.hero_selected).animate(
              {
                left: "-=" + Vue.hero.speed * Vue.speed_boost
              },
              10
            ); //left arrow key
            break;
          case 38:
            $("#hero" + Vue.hero_selected).animate(
              {
                top: "-=" + Vue.hero.speed * Vue.speed_boost
              },
              10
            ); //up arrow key
            break;
          case 39:
            $("#hero" + Vue.hero_selected).animate(
              {
                left: "+=" + Vue.hero.speed * Vue.speed_boost
              },
              10
            ); //right arrow key
            break;
          case 40:
            $("#hero" + Vue.hero_selected).animate(
              {
                top: "+=" + Vue.hero.speed * Vue.speed_boost
              },
              10
            ); //bottom arrow key
            break;
        }
        console.log(Vue.hero);
        Vue.$http
          .put(base_url + "heroes/" + Vue.hero_selected, {
            name: Vue.hero.name,
            speed: Vue.hero.speed,
            color: Vue.hero.color,
            position: [
              $("#hero" + Vue.hero_selected).position().top,
              $("#hero" + Vue.hero_selected).position().left
            ]
          })
          .then(res => {});
      });
      $(document).keyup(function(e) {
        //$("#hero").css("background-color", "pink");
        //console.log(e.keyCode);
      });
    }
  },
  created() {
    this.run(this.load_hero, this.running);
  },
  watch: {
    hero_selected: function() {
      // this.run(this.load_hero, this.running);
      // console.log(this.hero);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero {
  height: 50px !important;
  width: 50px !important;
  position: absolute;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
.green {
  background-color: green;
}
.controles {
  position: absolute;
  margin-left: 85%;
}
</style>
