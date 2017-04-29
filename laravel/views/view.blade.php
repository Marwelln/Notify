@if ($notify->hasMessage)
<div id='notify' class='alert {{ $notify->status }}' data-notify-autoclose='{{ $notify->autocloseTimer }}'>
	<button class='close hide'><i class='fa fa-remove'></i></button>
	{!! $notify->messages() !!}
</div>
@endif