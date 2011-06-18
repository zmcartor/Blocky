window.Blocky = class Blocky 
	constructor: (text = null ,container=null, config={}) ->
		if container
			@container=window.document.getElementById(container)
		if not @container
			console.log 'invalid container'
			return
		if not text
			console.log 'please provide some text for the QR code!'

		#QR code default settings. Can be overridden via config array.
		@cell_size = config.cell_size or 4
		@black = config.black or "rgb(0,0,0)"
		@white = config.white or "rgb(255,255,255)"
		@type_number = config.typenumber or 6
		@error_level = config.error_level or 'M'
		#in case they put something stupid
		@error_level.charAt(0).toUpperCase in ['m', 'h', 'q' ,'l'] or 'H' 
		text = text

		#some fun preset colors! :D
		if config.scheme in ['watermelon' , 'wedding' , 'arctic' , 'spicy']
			switch config.scheme
				when 'watermelon'
					@black = "rgb(247,12,71)"; @white="rgb(168,247,130)"
				when 'wedding'
					@black ="rgb(250,171,0)"; @white="rgb(198,247,176)"
				when 'arctic'
					@black = "rgb(252,0,244)"; @white="rgb(214,255,252)"
				when 'spicy'
					@black = "rgb(255,0,0)"; @white="rgb(250,245,170)"

		canvas = window.document.createElement 'canvas'
		if not canvas
			alert 'browser does not support Canvas. Sorry about that.'
			return

		@context = canvas.getContext '2d'
		
		@das_code = new QRCode @type_number , QRErrorCorrectLevel.H 
		@das_code.addData text
		@das_code.make()

		canvas_size = (@das_code.getModuleCount() * @cell_size)
		canvas.setAttribute 'width' , canvas_size
		canvas.setAttribute 'height' , canvas_size
		@container.appendChild canvas

		#big main loops to build the QR code 
		limit= @das_code.getModuleCount()

		if canvas.getContext
			for r in [0...limit]
				for c in [0...limit]
					do (r,c) =>
						if @das_code.isDark r,c
							@context.fillStyle = @black
						else
							@context.fillStyle = @white
						@context.fillRect c*@cell_size , r*@cell_size , @cell_size, @cell_size
						
		else
			console.log "no getContext.., cannot proceed."
