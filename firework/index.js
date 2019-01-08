/**
 * @Author: chanshiyu
 * @Date: 2019-01-08 10:11:41
 * @Description: a magic firework animation
 */

/**
 * @description 绑定事件 on(element, event, handler)
 */
const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

// 点击事件
const tap =
  'ontouchstart' in window || navigator.msMaxTouchPoints
    ? 'touchstart'
    : 'mousedown'

class Firework {
  constructor() {
    this.canvasEl = null // 画布元素
    this.ctx = null // 画布上下文
    this.numberOfParticules = 30 // 粒子数量
    this.colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'] // 粒子颜色
    this.tapFunc = null
    this.resizeFunc = null
    this.renderAnime = null
  }

  // Let's go
  start() {
    // 初始化画布
    this.setCanvasSize()

    // 监听点击和窗口缩放事件
    on(document, tap, this.render.bind(this))
    on(window, 'resize', this.setCanvasSize.bind(this))
  }

  // 销毁
  destroyed() {
    off(document, tap, this.render.bind(this))
    off(window, 'resize', this.setCanvasSize.bind(this))
    this.tapFunc = this.resizeFunc = this.renderAnime = null
  }

  // 设置画布尺寸
  setCanvasSize() {
    // 获取画布元素
    const canvasEl = document.querySelector('.fireworks')
    const ctx = canvasEl.getContext('2d')
    // 窗口尺寸
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    // 设置画布尺寸
    canvasEl.width = innerWidth * 2
    canvasEl.height = innerHeight * 2
    canvasEl.style.width = innerWidth + 'px'
    canvasEl.style.height = innerHeight + 'px'
    ctx.scale(2, 2)
    // 保存画布
    this.canvasEl = canvasEl
    this.ctx = ctx
  }

  // 创建扩散圈
  createCircle(x, y) {
    const ctx = this.ctx
    const p = {}
    p.x = x
    p.y = y
    p.color = '#FFF'
    p.radius = 0.1
    p.alpha = 0.5
    p.lineWidth = 6
    p.draw = function() {
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.lineWidth = p.lineWidth
      ctx.strokeStyle = p.color
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    return p
  }

  // 创建粒子
  createParticule(x, y) {
    const ctx = this.ctx
    const p = {}
    p.x = x
    p.y = y
    p.color = this.colors[anime.random(0, this.colors.length - 1)]
    p.radius = anime.random(16, 32)
    p.endPos = this.setParticuleDirection(p)
    p.draw = function() {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.fillStyle = p.color
      ctx.fill()
    }
    return p
  }

  // 粒子扩散方向
  setParticuleDirection(p) {
    const angle = (anime.random(0, 360) * Math.PI) / 180
    const value = anime.random(50, 180)
    const radius = [-1, 1][anime.random(0, 1)] * value
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle)
    }
  }

  // 绘制粒子
  renderParticule(anim) {
    for (let i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw()
    }
  }

  // 绘制烟火
  animateParticules(x, y) {
    const circle = this.createCircle(x, y)
    const particules = []
    for (let i = 0; i < this.numberOfParticules; i++) {
      particules.push(this.createParticule(x, y))
    }
    const renderParticule = this.renderParticule
    anime
      .timeline()
      .add({
        targets: particules,
        x(p) {
          return p.endPos.x
        },
        y(p) {
          return p.endPos.y
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule
      })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800)
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0
      })
  }

  // 点击事件
  render(e) {
    const canvasEl = this.canvasEl
    const ctx = this.ctx

    // 绘制前启用擦除画布
    if (!this.renderAnime) {
      this.renderAnime = anime({
        duration: Infinity,
        update() {
          ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
        }
      })
    }
    this.renderAnime.play()

    // 点击坐标
    const pointerX = e.clientX || e.touches[0].clientX
    const pointerY = e.clientY || e.touches[0].clientY
    this.animateParticules(pointerX, pointerY)
  }
}

const margicAnime = new Firework()
margicAnime.start()
