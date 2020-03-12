import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/main';
import Normal from '@/layout/normal';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Normal,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'view/profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '../views/profile/main.vue'),
        children: [
          {
            path: '',
            name: `profile-info`,
            component: () =>
              import(
                /* webpackChunkName: "profile-info" */ '../views/profile/info.vue'
              )
          },
          {
            path: 'message',
            name: 'message',
            component: () =>
              import(
                /* webpackChunkName: "message" */ '../views/profile/message.vue'
              )
          },
          {
            path: 'edit-info',
            name: `edit-info`,
            component: () =>
              import(
                /* webpackChunkName: "edit-info" */ '../views/profile/edit.vue'
              )
          },
          {
            path: 'user-address',
            name: `user-address`,
            component: () =>
              import(
                /* webpackChunkName: "user-address" */ '../views/profile/address.vue'
              )
          },
          {
            path: 'indent',
            name: `indent`,
            component: () =>
              import(
                /* webpackChunkName: "indent" */ '../views/profile/indent.vue'
              )
          }
        ]
      },
      {
        path: 'view/commodity/:id',
        component: () =>
          import(
            /* webpackChunkName: "commodity-details" */ '../views/commodity-details.vue'
          )
      },
      {
        path: 'view/contact',
        name: 'contact',
        component: () =>
          import(/* webpackChunkName: "contact" */ '../views/contact.vue')
      },
      {
        path: 'view/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/login.vue')
      },
      {
        path: 'view/sign-up',
        name: 'sign-up',
        component: () =>
          import(/* webpackChunkName: "sign-up" */ '../views/sign-up.vue')
      },
      {
        path: 'view/shop',
        name: 'shop',
        component: () =>
          import(/* webpackChunkName: "shop" */ '../views/shop/main.vue')
      },
      {
        path: 'view/cart',
        name: 'cart',
        component: () =>
          import(/* webpackChunkName: "cart" */ '../views/cart/main')
      },
      {
        path: 'view/to-money',
        name: 'to-money',
        component: () =>
          import(/* webpackChunkName: "to-money" */ '../views/to-money.vue')
      },
      {
        path: 'view/payment',
        name: 'payment',
        component: () =>
          import(/* webpackChunkName: "payment" */ '../views/shop/payment.vue')
      },
      {
        path: 'view/success',
        name: 'success',
        component: () =>
          import(/* webpackChunkName: "success" */ '../views/shop/page.vue')
      }
    ]
  },

  {
    path: '/manage',
    component: () => import(/* webpackChunkName: "manage" */ '@/layout/manage'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () =>
          import(
            /* webpackChunkName: "welcome" */ '../views/manage/welcome.vue'
          )
      },
      {
        path: 'commodities',
        name: 'commodities',
        component: () =>
          import(
            /* webpackChunkName: "commodities" */ '../views/manage/commodities.vue'
          )
      },
      {
        path: 'categories',
        name: 'categories',
        component: () =>
          import(
            /* webpackChunkName: "categories" */ '../views/manage/categories.vue'
          )
      },
      {
        path: 'classify',
        name: 'classify',
        component: () =>
          import(
            /* webpackChunkName: "classify" */ '../views/manage/classify.vue'
          )
      },
      {
        path: 'banners',
        name: 'banners',
        component: () =>
          import(
            /* webpackChunkName: "banners" */ '../views/manage/banners.vue'
          )
      },

    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
