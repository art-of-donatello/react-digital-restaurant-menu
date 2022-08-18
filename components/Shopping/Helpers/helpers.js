

function OpenMenu (btn) {
    const el = btn.querySelector('.subMenu')
    el.classList.remove('hidden')
    //el.classList.toggle('hidden')
  }
  
  function CloseMenu (btn) {
    const el = btn.querySelector('.subMenu')
    el.classList.add('hidden')
  }
function toggleHandle(){

    const btn = document.querySelectorAll('.dropdown')
        for(var x in btn){
        if (typeof btn[x] === 'object') {
        console.log(btn[x])
        btn[x].addEventListener('mouseover', function(){
            OpenMenu(this)
        })
     
        btn[x].addEventListener('mouseout', function(){
            
            CloseMenu(this)
            })
        }  
    }
  
}

export {toggleHandle,OpenMenu,CloseMenu}