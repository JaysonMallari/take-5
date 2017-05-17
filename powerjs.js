$(document).ready(function(){
	var value = 20;
	var whiteball = [];
	var powerball = [];
	var day, date;

	/*DRAW BUTTON*/
	$('.draw').click(function(){
		$('.drawList').slideToggle(300);
	});

	/*NUMBER OF DRAWS from the LIST*/
	$('.numChoice').click(function(){
		value = $(this).val();
		reset();
		power();
	});

	/*NUMBER OF DRAW FROM THE INPUT*/

	$('.submit').click(function(){
		value = $('#input').val();
		reset();
		power();
	});

	/* 	WHITE BALL FREQUENCY BUTTON*/
	$('.btnWB').click(function(){
		$('.outputWB').slideToggle();
		
	});

		/* 	POWER BALL FREQUENCY BUTTON*/
	$('.btnPB').click(function(){
		$('.outputPB').slideToggle();
		
	});


	/*RESET*/
	function reset(){
		 whiteball = [];
		 powerball = [];
		$('.output').html('');
		$('.outputWB').html('');
		$('.outputPB').html('');
	}

	/*	DAY OF THE WEEK */
	function dayAt(day){
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		return days[day];
	}

	/*	FREQUENCY */
	function frequency(arr, str){
		var arrNew = [];
		
		arr = arr.sort(function(a,b) { return a - b });
		var  current = null;
		var count = 0;
			for(var i=0;i<arr.length;i++){
				var intArr = parseInt(arr[i]);
				if(intArr !== current){
					if(count > 0){
						arrNew[current] = count;
					}
				current = intArr;
				count = 1;
				}
				else{
					count += 1;
				}
			}
			if(count > 0){
			arrNew[current] = count;
			}
	freOutput(arrNew, str);
	}


	/* FREQUENCY OUTPUT*/
	function freOutput(arr, str){

				if(str === 'wb'){
					for(var x=1;x<70;x++){
						if(arr[x]=== undefined){
				 			$('.outputWB').append(x+' : 0<br>');
				 		}
				 		else{	
				 		$('.outputWB').append(x+' : '+arr[x] +'<br>');
				 		}
			 		}
				}
				else{
					for(var x=1;x<27;x++){
						if(arr[x]=== undefined){
				 			$('.outputPB').append(x+' : 0<br>');
				 		}
				 		else{	
				 		$('.outputPB').append(x+' : '+arr[x] +'<br>');
				 		}
			 		}
			 	}
			

	}

	/*IS IT PRIME*/
	function isPrime(num){
		if(num < 2){
			return false;
		}
		for(var x=2;x<=num;x++){
			if(num % x === 0 && num != x){
				return false;
			}
		}
		return true;
	}

	/*IS IT EVEN*/
	function isEven(num){
		if (num % 2 === 0){
			return true;
		}
		return false;
	}

	/*OUTPUT EVEN and PRIME*/

	function info(num){
						if(isPrime(num)){
							$('.output').append('<span class="p">P</span>');
						}
						else{
							$('.output').append('<span class="p">NP</span>');
						}

						if(isEven(num)){
							$('.output').append('<span class="e">E</span>');
						}
						else{
							$('.output').append('<span class="e">O</span>');
						}
	}


	/*SEGREGATE WHITE AND POWER BALLS*/
	function output(day, date, str){
		var power  = [];
		var white = [];
		var seg = str.split(" ");
			
			for(var x=0;x<seg.length;x++){

				if (x === 0){
					$('.output').append('<h5 class="toplabel">'+day+'&nbsp'+date+'</h5><span class="wb">' + seg[x] + ' </span>');
					whiteball.push(seg[x]);
						info(seg[x]);
				}
				else if (x < 5){
					$('.output').append('<span class="wb">' + seg[x] + ' </span>');
					whiteball.push(seg[x]);
					info(seg[x]);
				}
				else{
					$('.output').append('<span class="pb">' + seg[x] + ' </span>');
					powerball.push(seg[x]);
					info(seg[x]);
					$('.output').append('<br><br><hr>');
				}
			}
	}


	/*POWERBALL FUNCTION*/
	function power(){
		var url = 'https://data.ny.gov/resource/8vkr-v8vh.json'; // powerball URL

		$.getJSON(url, function(data){

			for(var x=0 ;x<value;x++){
				date = new Date(data[x].draw_date);
					//date = date.replace('T00:00:00.000',''); //Date
					month = date.getMonth();
					day = date.getDate();
					year = date.getFullYear(); 
					date = month + '/' + day +'/'+ year;//Date

			 	day = new Date(data[x].draw_date).getDay(); //5=firday 2=tuesday
					day = dayAt(day + 1 )

				output(day, date, data[x].winning_numbers);
			}

			frequency(whiteball,'wb');
			frequency(powerball,'pb');
		});

	}


	power();

});