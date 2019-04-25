<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
	<style> 
	.modal-content{
		margin-top: 80px; 
	}
	</style>
    {{-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"> --}}
</head>
<body>

        <div id="app">
        	  @yield('content')
        </div>
 
    <script src="/js/app.js"></script>
</body>
</html>