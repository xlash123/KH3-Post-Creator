function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

	const textFormat = {left: 50, top: 720, fontFamily: 'KH3 Post', fontSize: 24, lineHeight: 1.5, fontWeight: 'bold'};

const postWidth = 906;
const postHeight = 510;

var canvas;

window.onload = () => {
	var canvasNorm = document.getElementById('canvas');
	canvasNorm.width = 453;
	canvasNorm.height = 506;
	canvas = new fabric.StaticCanvas('canvas');
	canvas.setZoom(0.5);
	canvasNorm.width *= 2;
	canvasNorm.height *= 2;
	canvas.width *= 2;
	canvas.height *= 2;
	canvas.setZoom(1);
	canvas.bodyText = new fabric.IText('Sample text', textFormat);
	canvas.bodyText.setColor('#3f3f3f')
	fabric.Image.fromURL('img/template.png', (oImg) => {
		canvas.add(oImg);
		canvas.add(canvas.bodyText);
	})
	onPersonChange('unknown')
}

function onPersonChange(val){
	if(canvas){
		fabric.Image.fromURL('img/'+val+'.png', (oImg) => {
			if(canvas.currentPerson)
				canvas.remove(canvas.currentPerson);

			oImg.set({left: 40, top:98})

			canvas.currentPerson = oImg;
			canvas.add(oImg);
		})
	}
}

function onTextChange(text){
	if(canvas){
		const regex = /\B#\w+/g;
		canvas.remove(canvas.bodyText);
		var lines = text.split('\n');
		var styles = {};
		for(var i=0; i<lines.length; i++){
			var matches = lines[i].match(regex);
			if(!matches) matches = [];
			styles[i] = {};
			for(var m=0; m<matches.length; m++){
				var l = lines[i].indexOf(matches[m]);
				for(var letter=0; letter<matches[m].length; letter++){
					styles[i][l+letter] = {fill: 'blue'}
				}
			}
		}
		canvas.bodyText = new fabric.IText(text, {...textFormat, styles});
		canvas.bodyText.setColor('#3f3f3f')
		canvas.add(canvas.bodyText);
	}
}

function readURL(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	if(canvas.postImage)
        		canvas.remove(canvas.postImage);
            fabric.Image.fromURL(e.target.result, (img) => {
            	var scale;
            	if(img.height > img.width){
            		scale = postHeight/img.height;
            		img.scale(scale);
            	}else{
            		scale = postWidth/img.width;
            		img.scale(scale);
            	}
            	const x = postWidth/2 - scale*img.width/2
            	const y = postHeight/2 - scale*img.height/2;
            	img.set({top: 180 + y, left: x});
            	canvas.postImage = img;
            	canvas.add(img);
            });
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function onSave(){
	if(canvas){
		var canvasNorm = document.getElementById('canvas');
		if(mobilecheck()){

		}else Canvas2Image.saveAsPNG(canvasNorm, canvasNorm.width, canvasNorm.height, 'kh3 post');
	}
}