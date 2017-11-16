import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import numeral from 'numeral';

import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);

import myApp from '../../client/pages/MyApp.vue';
Meteor.startup(() => {
  new Vue({
    render: h => h(myApp)
  }).$mount('app');
});