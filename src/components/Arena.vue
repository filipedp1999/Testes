<template>
  <div>
    {{is_load}}
    <div v-if="is_load">
      <div
        v-for="herox in all_heroes"
        class="hero"
        :key="herox.id"
        :style="'background-color: '+herox.color"
        :id="'hero'+herox.id"
      >{{herox.name}} // {{herox.id}}</div>
      <input
        class="controles"
        v-model="control_id"
        type="number"
        :min="all_heroes[0].id"
        :max="all_heroes[all_heroes.length-1].id"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Arena",
  data() {
    return {
      is_running: false,
      is_load: false,
      all_heroes: [],
      control_id: 1,
      speed_boost: 10,
      selected_hero: []
    };
  },
  computed: {},
  beforeCreate() {},
  methods: {
    start_position: function(callback = function() {}) {
      let Vue = this;
      this.all_heroes.forEach(function(hero) {
        // console.log("#hero" + hero.id);
        // console.log($("#hero" + hero.id).position());
        Vue.set_posion($("#hero" + hero.id), hero.position);
      });
    },
    set_posion: function(object, param) {
      console.log(object.position());
      object.css({
        top: param.top,
        left: param.left
      });
    },
    get_allheroes: function(callback = function() {}) {
      this.$http
        .get(this.database + "heroes/?_sort=id&_order=asc")
        .then(res => {
          this.all_heroes = res.body;
          this.is_load = true;
          callback();
        });
    },
    get_selected_hero: function(callback = function() {}) {
      this.$http.get(this.database + "heroes/" + this.control_id).then(res => {
        this.get_selected_hero = res.body;
        callback();
      });
    },
    atualizar_hero: function(callback = function() {}) {
      this.$http
        .put(base_url + "heroes/" + this.control_id, {
          name: this.selected_hero.name,
          speed: this.selected_hero.speed,
          color: this.selected_hero.color,
          position: [
            $("#hero" + this.control_id).position().top,
            $("#hero" + this.control_id).position().left
          ]
        })
        .then(res => {
          callback();
        });
    },
    move_up: function(object) {
      let Vue = this;
      object.animate(
        {
          top: "-=" + Vue.selected_hero.speed * Vue.speed_boost
        },
        10
      );
    },
    move_down: function(object) {
      let Vue = this;
      object.animate(
        {
          top: "+=" + Vue.selected_hero.speed * Vue.speed_boost
        },
        10
      );
    },
    move_left: function(object) {
      let Vue = this;
      object.animate(
        {
          left: "-=" + Vue.selected_hero.speed * Vue.speed_boost
        },
        10
      );
    },
    move_right: function(object) {
      let Vue = this;
      object.animate(
        {
          left: "+=" + Vue.selected_hero.speed * Vue.speed_boost
        },
        10
      );
    }
  },
  created() {},
  watch: { control_id: function() {} },
  mounted() {
    this.get_allheroes(this.start_position);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero {
  height: 50px !important;
  width: 50px !important;
  position: absolute !important;
}
</style>
