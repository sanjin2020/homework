$(function(){
  let poke = [];
  let colorArr = ['s','h','d','c'];
  let flag = {};
  let number
  let color;
  for (let i=0;i<52;i++){
      let index = Math.floor(Math.random()*colorArr.length);
      color = colorArr[index];
      number = Math.round(Math.random()*12+1);
      while(flag[color+'_'+number]){
      let index = Math.floor(Math.random()*colorArr.length);
      color=colorArr[index];
      number = Math.round(Math.random()*12+1);
      }
      poke.push({color,number});
    flag[color+'_'+number] = true;
  }
  // console.log(poke);
    let leftt = 0;
    let index = -1;
    let obj;
    for (let i=0;i<8;i++){
        for(let j=0;j<i;j++){
            index++;
            obj = poke[index];
            let lefts = 350-50*i + 100*j+50,tops = 50*i;
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')
                .attr('already',false)
                .attr('id',i+'_'+j)
                .data('number',obj.number)
                .delay(index*100)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }
    for(++index;index<52;index++){
        let obj = poke[index];
        $('<div>')
            .addClass('poke')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .appendTo('.box')
            .attr('already',false)
            .attr('id',-2+'_'+index)
            .data('number',obj.number)
            .delay(index*100)
            .animate({left:`${leftt+=20}`,top:480,opacity:1})
    }
    let first = null;
    $('.box').on('click','.poke',function () {
        let _this = $(this);
        let [i,j] = _this.attr('id').split('_');
        let id1 =i*1+1+'_'+j;
        let id2 =i*1+1+'_'+(j*1+1);
        if($('#'+id1).length ||$('#'+id2).length){
            return ;
        }
        /*//////////////////点击抬起放下///////////////////////*/
        if(_this.attr('already') == 'false'){
            _this.animate({top:'-=30'});
            _this.attr('already',true) ;
        }else{
            _this.animate({top:'+=30'});
            _this.attr('already',false) ;
        }
        /*//////////////////游戏规则判定///////////////////////*/
        if(!first){
            first = _this;
        }else{
            if(first.attr('id') == _this.attr('id')){
                first = null;
                return;
            }
            let number1 = first.data('number');
            let number2 = _this.data('number');
            if(number1 + number2 >= 5){
                let [,fy]=first.attr('id').split('_');
                let leftt1=parseInt(first.css("left"))-40;
                let [,_n]=_this.attr('id').split('_');
                let leftt2=parseInt(_this.css("left"))-40;
                first.animate({top:0,left:710,opacity:0},function () {
                    $(this).remove();
                });
                _this.animate({top:0,left:710,opacity:0},function () {
                    _this.remove();
                });
                $('.flower').animate({opacity:1,zIndex:999},1000,function () {
                    $('.flower').animate({opacity:0},1000);
                })
                //////////////补齐//////////////////////

                if(fy >=27 ){
                    for(;fy<52;fy++){
                        $(`#${'-2_'+fy}`).attr('id',-2+'_'+(fy-1)).animate({left:`${leftt1+=20}`,top:480,opacity:1})

                    }
                }
                if(_n >=27 ){
                    for(;_n<52;_n++){
                        $(`#${'-2_'+_n}`).attr('id',-2+'_'+(_n-1)).animate({left:`${leftt2+=20}`,top:480,opacity:1})

                    }
                }

            }else{
                first.animate({top:'+=30'});
                _this.animate({top:'+=30'});
                first.attr('already',false) ;
                _this.attr('already',false) ;
            }
            first = null;
        }
    })
})