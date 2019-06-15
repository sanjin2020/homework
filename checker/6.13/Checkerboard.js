$(function(){
    let box = $('.box');
    let balck ={};
    let white ={};
    let blank ={};
    let ai = true;
    for(let i=0 ;i < 15;i++){
        for(let j=0;j < 15;j++){
            $('<div>').addClass('Checkerboard').appendTo(box).attr('id',`${i}_${j}`);
            blank[i + '_' + j] = true;
        }
    }
    let chang = false;
    box.on('click','.Checkerboard',function(){

        if($(this).attr('status') === 'true'){
            return;
        }
        let coords = $(this).attr('id');
        if(chang){
            balck[coords] = true;
            delete blank[coords];
            $(this).addClass('black').attr('status','true');
            chang = false;
            let hfs = judge(balck,coords);
            if(hfs[1]){
                $('.hf').animate({zIndex:9999},function () {
                    $('.hf').animate({opacity: 1},1000);
                });
                box.off('click');
            }
        }else{
            white[coords] = true;
            delete blank[coords];
            $(this).addClass('white').attr('status','true');
            let bfs =judge(white,coords);
            if(bfs[0]>=5){
                box.off('click');
            }
            if(ai){
               let pos = aifn();
               console.log(pos);
               balck[pos] = true;
               delete blank[pos];
               console.log(balck);
               console.log('#'+pos);
               $('#'+pos).addClass('black');
                let hfs = judge(balck,pos);
                if(hfs[1]){
                    $('.hf').animate({zIndex:9999},function () {
                        $('.hf').animate({opacity: 1},1000);
                    });
                    box.off('click');
                }
            }
            if(bfs[1]){
                $('.bf').animate({zIndex:9999},function () {
                    $('.bf').animate({opacity: 1},1000);
                });
                box.off('click');
            }
        }
    });
    function aifn() {
        let  balckScore = 0,whiteScore = 0;
        let pos1 = '',pos2 = '';
        for(let i in blank){
            let score = judge(white,i)[0];
            if(score >= whiteScore){
                whiteScore=score;
                pos1 = i;
            }
        }
        for(let i in blank){
            let score = judge(balck,i)[0];
            if(score >= balckScore){
                balckScore=score;
                pos2 = i;
            }
        }
        return balckScore >= whiteScore ? pos2 : pos1;
    }
    function judge(obj,coords) {
        let sp = 1,cz = 1,zx = 1,yx = 1;
        let [x,y] = coords.split('_');
        let i = x * 1;
        let j = y * 1;
        /*水平sp*/
        while(obj[i+'_'+(++j)]){
            sp++;
        }
        i = x * 1;
        j = y * 1;
        while(obj[i+'_'+(--j)]){
            sp++
        }
        /*垂直cz*/
        i = x * 1;
        j = y * 1;
        while(obj[(++i)+'_'+j]){
            cz++;
        }
        i = x * 1;
        j = y * 1;
        while(obj[(--i)+'_'+j]){
            cz++;
        }
        /*撇zx*/
        i = x * 1;
        j = y * 1;
        while(obj[(--i)+'_'+(++j)]){
            zx++;
        }
        i = x * 1;
        j = y * 1;
        while(obj[(++i)+'_'+(--j)]){
            zx++
        }
        /*捺yx*/
        i = x * 1;
        j = y * 1;
        while(obj[(++i)+'_'+(++j)]){
            yx++;
        }
        i = x * 1;
        j = y * 1;
        while(obj[(--i)+'_'+(--j)]){
            yx++
        }
        let max = Math.max(sp,cz,yx,zx);
        if(sp === 5||cz=== 5|| yx===5||zx===5){

            return [max,'胜负已分'];
        }
        return [max,null];
    }
});