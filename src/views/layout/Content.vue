<template>
  <div class="ccw_content">
    <div class="navi">
      <div id="nav-line"></div>
      <ul class="container nav">
        <li
          v-role="'ContentManager'"
          @mouseover="overNavItem(6)"
          @mouseout="outNavItem"
          :class="{active: active === 6}"
        >
          <router-link class="nav-item" name="Content" :to="{name: 'Content'}">Content Management</router-link>
          <div class="submenu">
            <div>
              <ul>
                <li>
                  <router-link name="Content" :to="{name: 'Content'}">Content Setting</router-link>
                </li>
                <li>
                  <router-link name="SearchArticle" :to="{name: 'SearchArticle'}">Search Article</router-link>
                </li>
                <li>
                  <router-link name="Comments" :to="{name: 'Comment'}">Comments</router-link>
                </li>
                <li>
                  <router-link name="MessageList" :to="{name: 'MessageList'}">Contact Me</router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="container clear-fix" style="padding-bottom: 40px;">
      <router-view style="min-height: 500px"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyHeader from '@/views/layout/Header.vue'
import { userInfo, BaseObject } from '@/utils'

@Component({
  components: {
    MyHeader: MyHeader
  }
})
export default class CcwContent extends Vue {
  active = 0
  industries: string[] = []
  RolesSign: string[] = []
  IsAcceptVisitRecord = 0

  mounted (): void {
    this.industries = (userInfo.get() as BaseObject).Industrys || []
    this.RolesSign = (userInfo.get() as BaseObject).RolesSign || []
    this.IsAcceptVisitRecord = (userInfo.get() as BaseObject).IsAcceptVisitRecord || 0
  }

  overNavItem (index: number): void {
    this.active = index
  }

  outNavItem (): void {
    this.active = 0
  }
}
</script>

<style lang="less" scoped>
  .ccw_content {

    width: 100%;
    margin: 0;
    padding: 0 !important;

    .container {
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }

    .navi {
      position: relative;
      border-bottom: 2px solid #dfe6ed;
      margin-bottom: 38px;

      #navi-line {
        position: absolute;
        border-top: 4px solid #41aaaa;
        bottom: 0;
        transition: left 0.5s ease 0s, width 0.5s ease 0s;
      }
    }

    .nav {
      text-align: left;
      height: 60px;

      > li {
        display: inline-block;
        margin-right: 25px;
        position: relative;

        .submenu {
          display: none;
          position: absolute;
          left: 0;
          right: 0;
          border-top: 1px solid #e3eaf0;
          background: #eaf0f5;
          z-index: 999;
          padding-bottom: 40px;
          width: 330px;

          &.last {
            left: auto;
          }

          ul {
            margin-top: 20px;
            padding: 0 15px;

            li {
              border-bottom: 1px solid #dee6ee;

              a {
                display: block;
                padding: 10px 20px 10px 30px;
                font-size: 14px;
                color: #606266;
                background: transparent url('../../assets/img/icon_arrowFill.png') 5% center no-repeat;

                &:hover {
                  background: #dee6ed url('../../assets/img/icon_arrowFill.png') 5% center no-repeat;
                  color: #005578;
                  text-decoration: underline;
                }
              }
            }
          }
        }

        &.active {
          .submenu {
            display: block;
          }
        }

        .nav-item {
          display: inline-block;
          padding: 27px 15px 12px;
          font-size: 16px;
          color: #778690;
          box-sizing: border-box;
          border-bottom: 3px solid white;

          &:hover {
            color: #3C464B;
          }

          &.router-link-active {
            color: #3C464B;
            border-bottom: 5px solid #009FA8;
          }
        }
      }
    }
  }
</style>
