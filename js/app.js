const textFormat = {left: 50, top: 720, fontFamily: 'Century Gothic', fontSize: 20, fontWeight: 'bold'};

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
	canvas.bodyText = new fabric.Text('Sample text', textFormat);
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
		canvas.remove(canvas.bodyText);
		canvas.bodyText = new fabric.Text(text, textFormat);
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
		Canvas2Image.saveAsPNG(canvasNorm, canvasNorm.width, canvasNorm.height, 'kh3 post');
	}
}