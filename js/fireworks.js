function P(i) {
    let s = ["102, 167, 221", "62, 131, 225", "33, 78, 194"];
    i = Object.assign({
        colors : s,
        numberOfParticles: 20,
        orbitRadius: {
            min: 50,
            max: 100
        },
        circleRadius: {
            min: 10,
            max: 20
        },
        diffuseRadius: {
            min: 50,
            max: 100
        },
        animeDuration: {
            min: 900,
            max: 1500
        }
    }, i);
    let u = 0
      , l = 0
      , c = i.colors || s
      , o = document.querySelector(".fireworks")
      , t = o.getContext("2d");
    function m(e) {
        e.width = window.innerWidth,
        e.height = window.innerHeight,
        e.style.width = `${window.innerWidth}px`,
        e.style.height = `${window.innerHeight}px`
    }
    function h(e) {
        u = e.clientX || (e.touches[0] ? e.touches[0].clientX : e.changedTouches[0].clientX),
        l = e.clientY || (e.touches[0] ? e.touches[0].clientY : e.changedTouches[0].clientY)
    }
    function f(e) {
        let a = window.anime.random(0, 360) * Math.PI / 180
          , n = window.anime.random(i.diffuseRadius.min, i.diffuseRadius.max)
          , d = [-1, 1][window.anime.random(0, 1)] * n;
        return {
            x: e.x + d * Math.cos(a),
            y: e.y + d * Math.sin(a)
        }
    }
    function x(e, a) {
        let n = {
            x: e,
            y: a,
            color: `rgba(${c[window.anime.random(0, c.length - 1)]},${window.anime.random(.2, .8)})`,
            radius: window.anime.random(i.circleRadius.min, i.circleRadius.max),
            endPos: null,
            draw() {}
        };
        return n.endPos = f(n),
        n.draw = function() {
            t.beginPath(),
            t.arc(n.x, n.y, n.radius, 0, 2 * Math.PI, !0),
            t.fillStyle = n.color,
            t.fill()
        }
        ,
        n
    }
    function b(e, a) {
        let n = {
            x: e,
            y: a,
            color: "#000",
            radius: .1,
            alpha: .5,
            lineWidth: 6,
            draw() {}
        };
        return n.draw = function() {
            t.globalAlpha = n.alpha,
            t.beginPath(),
            t.arc(n.x, n.y, n.radius, 0, 2 * Math.PI, !0),
            t.lineWidth = n.lineWidth,
            t.strokeStyle = n.color,
            t.stroke(),
            t.globalAlpha = 1
        }
        ,
        n
    }
    function w(e) {
        for (let a = 0; a < e.animatables.length; a++)
            e.animatables[a].target.draw()
    }
    function g(e, a) {
        let n = b(e, a)
          , d = [];
        for (let r = 0; r < i.numberOfParticles; r++)
            d.push(x(e, a));
        window.anime.timeline().add({
            targets: d,
            x(r) {
                return r.endPos.x
            },
            y(r) {
                return r.endPos.y
            },
            radius: .1,
            duration: window.anime.random(i.animeDuration.min, i.animeDuration.max),
            easing: "easeOutExpo",
            update: w
        }).add({
            targets: n,
            radius: window.anime.random(i.orbitRadius.min, i.orbitRadius.max),
            lineWidth: 0,
            alpha: {
                value: 0,
                easing: "linear",
                duration: window.anime.random(600, 800)
            },
            duration: window.anime.random(1200, 1800),
            easing: "easeOutExpo",
            update: w
        }, 0)
    }
    let p = window.anime({
        duration: Number.POSITIVE_INFINITY,
        update: ()=>{
            t.clearRect(0, 0, o.width, o.height)
        }
    });
    document.addEventListener("mousedown", e=>{
        p.play(),
        h(e),
        g(u, l)
    }
    , !1),
    m(o),
    window.addEventListener("resize", ()=>{
        m(o)
    }
    , !1)
}

document.addEventListener('DOMContentLoaded', () => {
    let i = {};
    
    P(i)
});
