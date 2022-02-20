//Functions

function setLed(pad, color)
{
	local.sendNoteOn(1, pad+35, colors[0]);
}

//Commands


function setPadColor(pad, colors)
{
	//setLed(pad, color[0]);
	i = parseInt(pad);
	//script.log("a: "+i+"/"+colors[0]);
	x = colors[0];
	if (x == 0)
	{
		local.values.padColors.getChild("pad"+i).set("Black");
	}
	else if (x == 127)
	{
		local.values.padColors.getChild("pad"+i).set("Orange");
	}
}
	


function resetColors()
{
	for(var i=0;i<63;i++) 
		{
			setPadColor(i, 0);
		}

}

//Events

function moduleParameterChanged(param)
{
  script.log(value.name + " param changed, new value: " + param.get());
}

function moduleValueChanged(value) {
  script.log(value.name + " value changed, new value: " + value.get());
  	if(value.getParent().name == "padColors")
	{
		var id = parseInt(value.name.substring(3, 5));
		var val = value.get();
		script.log("Test: "+id+"/"+value.name.substring(3, 5)+"/"+val[0]);
		//setLed(value.name.substring(3, 5), val[0]);
		local.sendNoteOn(1, id+35, val[0]);

	}
}

function noteOnEvent(channel, pitch, velocity)
{
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
	i = pitch - 35;
    local.values.pads.getChild("pad" + i).set(1);
}


function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
	i = pitch - 35;
    local.values.pads.getChild("pad" + i).set(0);
}

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
}

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
}