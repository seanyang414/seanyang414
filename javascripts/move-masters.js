function getStyle(obj,name)// parseInt(getStyle(obj,name))
		{
			if(obj.currentStyle)
			{
				return obj.currentStyle[name];
			}
			else
			{
				return getComputedStyle(obj,false)[name];
			}

		}

		function startMove(obj, json, timeFac, fn)
		{
			clearInterval(obj.timer);
			obj.timer = setInterval(function()
				{	
					var bStop=true;//make sure all attr arrives target,here, assume
								   //all the attr arrived at target.
					for(var attr in json)
					{
						var cur=0;

						if(attr == 'opacity')//operate opacity attribute
						{
							cur = Math.round(parseFloat(getStyle(obj,attr))*100);
						}
						else
						{
							cur = parseInt(getStyle(obj,attr));
						}
						
						var speed =(json[attr]-cur)/timeFac;
						speed=speed>0?Math.ceil(speed):Math.floor(speed);
						
						if(cur!=json[attr])//if there is an attr is not arrived itarget
							{bStop = false;}

						if(attr == 'opacity')
						{
							obj.style.opacity = (cur+speed)/100;
							obj.style.filter = 'Alpha(opacity='+(cur+speed)+')';
						}
						else
						{
							obj.style[attr] = cur + speed +'px';
						}
					}
						if(bStop)
						{	
							clearInterval(obj.timer);

							if(fn)
							{
								fn();
							}
						}	
					
				},30)

		}
