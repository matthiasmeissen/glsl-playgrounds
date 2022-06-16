const canvas = document.querySelector('.glslCanvas')

const setSize = function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

setSize()

window.addEventListener('resize', setSize)
