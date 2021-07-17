import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const Layout = lazy(() => import('../views/Layout'))
const Search = lazy(() => import('../views/Search'))
const Discovery = lazy(() => import('../views/Discovery'))
const Playlists = lazy(() => import('../views/Playlists'))
const Songs = lazy(() => import('../views/Songs'))
const Mvs = lazy(() => import('../views/Mvs'))
const Mv = lazy(() => import('../views/Mv'))
const PlaylistDetail = lazy(() => import('../views/PlaylistDetail'))
const SearchSongs = lazy(() => import('../views/SearchSongs'))
const SearchPlaylists = lazy(() => import('../views/SearchPlaylists'))
const SearchMvs = lazy(() => import('../views/SearchMvs'))

// 左侧边栏菜单
export const menuRoutes = [
  {
    path: '/discovery',
    component: SuspenseComponent(Discovery),
    title: '发现音乐',
    icon: 'music'
  },
  {
    path: '/playlists',
    component: SuspenseComponent(Playlists),
    title: '推荐歌单',
    icon: 'playlist-menu'
  },
  {
    path: '/songs',
    title: '最新音乐',
    component: SuspenseComponent(Songs),
    icon: 'yinyue'
  },
  {
    path: '/mvs',
    title: '最新MV',
    component: SuspenseComponent(Mvs),
    icon: 'mv'
  }
]

// 主路由
const routes = [
  {
    path: '/',
    component: SuspenseComponent(Layout),
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/discovery'} />
      },
      {
        path: '/playlist/:id',
        component: SuspenseComponent(PlaylistDetail)
      },
      {
        path: '/mv/:id',
        component: SuspenseComponent(Mv)
      },
      {
        path: '/search/:keywords',
        component: SuspenseComponent(Search),
        routes: [
          {
            path: '/search/:keywords/songs',
            component: SuspenseComponent(SearchSongs)
          },
          {
            path: '/search/:keywords/playlists',
            component: SuspenseComponent(SearchPlaylists)
          },
          {
            path: '/search/:keywords/mvs',
            component: SuspenseComponent(SearchMvs)
          }
        ]
      },
      ...menuRoutes
    ]
  }
]

export default routes