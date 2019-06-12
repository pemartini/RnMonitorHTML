<?php
session_start();
/*
if(!$_SESSION){
	header("location:/login.php");
	die();
} else{
	if((time() - $_SESSION['timeout'] > 900 || time() - $_SESSION['timeoutTotal'] > 3600)){
		header("location:/logout.php");
	}
	else{
		$_SESSION['timeout'] = time();
	}
}*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>RnMonitor</title>
	<meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
	<link rel="icon" href="./assets/img/logo.ico" type="image/x-icon"/>

	<!-- Fonts and icons -->
	<script src="./assets/js/plugin/webfont/webfont.min.js"></script>
	<script>
		WebFont.load({
			google: {"families":["Lato:300,400,700,900"]},
			custom: {"families":["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands", "simple-line-icons"], urls: ['./assets/css/fonts.min.css']},
			active: function() {
				sessionStorage.fonts = true;
			}
		});
	</script>
	
	<link rel="stylesheet" href="./assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="./assets/css/atlantis.min.css">
	<link rel="stylesheet" href="./assets/css/ol-ext.css">
	<link rel="stylesheet" href="./assets/css/mapa.css">
	<link rel="stylesheet" href="./assets/ol/ol.css">

</head>
<body>
	<div class="wrapper sidebar_minimize">
		<div class="main-header">
			<!-- Logo Header -->
			<div class="logo-header" data-background-color="blue">
				
				<a href="index.html" class="logo">
					<img src="./assets/img/Rn.png" alt="navbar brand" class="navbar-brand" with="100%" height="100%">
				</a>
				<button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon">
						<i class="icon-menu"></i>
					</span>
				</button>
				<button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
				<div class="nav-toggle">
					<button class="btn btn-toggle toggle-sidebar">
						<i class="icon-menu"></i>
					</button>
				</div>
			</div>
			<!-- End Logo Header -->
			<!-- Navbar Header -->
			<nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue2">				
				<div class="container-fluid">
					<ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
						<li class="nav-item dropdown hidden-caret">
							<a class="nav-link dropdown-toggle" href="#" id="notifDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<i class="fa fa-bell"></i>
								<span class="notification">4</span>
							</a>
							<ul class="dropdown-menu notif-box animated fadeIn" aria-labelledby="notifDropdown">
								<li>
									<div class="dropdown-title">You have 4 new notification</div>
								</li>
								<li>
									<div class="notif-scroll scrollbar-outer">
										<div class="notif-center">
											<a href="#">
												<div class="notif-icon notif-primary"> <i class="fa fa-user-plus"></i> </div>
												<div class="notif-content">
													<span class="block">
														New user registered
													</span>
													<span class="time">5 minutes ago</span> 
												</div>
											</a>
											<a href="#">
												<div class="notif-icon notif-success"> <i class="fa fa-comment"></i> </div>
												<div class="notif-content">
													<span class="block">
														Rahmad commented on Admin
													</span>
													<span class="time">12 minutes ago</span> 
												</div>
											</a>
											<a href="#">
												<div class="notif-img"> 
													<img src="./assets/img/profile.png" alt="Img Profile">
												</div>
												<div class="notif-content">
													<span class="block">
														Reza send messages to you
													</span>
													<span class="time">12 minutes ago</span> 
												</div>
											</a>
											<a href="#">
												<div class="notif-icon notif-danger"> <i class="fa fa-heart"></i> </div>
												<div class="notif-content">
													<span class="block">
														Farrah liked Admin
													</span>
													<span class="time">17 minutes ago</span> 
												</div>
											</a>
										</div>
									</div>
								</li>
								<li>
									<a class="see-all" href="javascript:void(0);">See all notifications<i class="fa fa-angle-right"></i> </a>
								</li>
							</ul>
						</li>
						<li class="nav-item dropdown hidden-caret">
							<a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
								<i class="fas fa-layer-group"></i>
							</a>
							<div class="dropdown-menu quick-actions quick-actions-info animated fadeIn">
								<div class="quick-actions-header">
									<span class="title mb-1">Quick Actions</span>
									<span class="subtitle op-8">Shortcuts</span>
								</div>
								<div class="quick-actions-scroll scrollbar-outer">
									<div class="quick-actions-items">
										<div class="row m-0">
											<a class="col-6 col-md-4 p-0" href="#">
												<div class="quick-actions-item">
													<i class="flaticon-file-1"></i>
													<span class="text">Generated Report</span>
												</div>
											</a>
											<a class="col-6 col-md-4 p-0" href="#">
												<div class="quick-actions-item">
													<i class="flaticon-database"></i>
													<span class="text">Create New Database</span>
												</div>
											</a>
											<a class="col-6 col-md-4 p-0" href="#">
												<div class="quick-actions-item">
													<i class="flaticon-pen"></i>
													<span class="text">Create New Post</span>
												</div>
											</a>
											<a class="col-6 col-md-4 p-0" href="#">
												<div class="quick-actions-item">
													<i class="flaticon-interface-1"></i>
													<span class="text">Create New Task</span>
												</div>
											</a>
											<a class="col-6 col-md-4 p-0" href="#">
												<div class="quick-actions-item">
													<i class="flaticon-list"></i>
													<span class="text">Completed Tasks</span>
												</div>
											</a>
											<a class="col-6 col-md-4 p-0" href="#">
												<div class="quick-actions-item">
													<i class="flaticon-file"></i>
													<span class="text">Create New Invoice</span>
												</div>
											</a>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li class="nav-item dropdown hidden-caret">
							<ul class="dropdown-menu dropdown-user animated fadeIn">
								<div class="dropdown-user-scroll scrollbar-outer">
									<li>
										<div class="user-box">
											<div class="avatar-lg"><img src="./assets/img/profile.png" alt="image profile" class="avatar-img rounded"></div>
											<div class="u-text">
												<h4>Name</h4>
												<p class="text-muted">email@email.pt</p><a href="profile.html" class="btn btn-xs btn-secondary btn-sm">View Profile</a>
											</div>
										</div>
									</li>
									
								</div>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
			<!-- End Navbar -->
		</div>

		<!-- Sidebar -->
		<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src="./assets/img/logo.ico" alt="..." class="avatar-img rounded-circle">
						</div>
						<div class="info">
							<a  href="account.php" aria-expanded="true">
								<span>Pedro
								<span class="user-level">Account Settings</span>
								</span>
							</a>
							<div class="clearfix"></div>
						</div>
					</div>
					<ul class="nav nav-primary">
						<li class="nav-item active">
							<a data-toggle="collapse" href="index.php" class="collapsed" aria-expanded="false">
								<i class="fas fa-map-marker-alt"></i>
								<p>Map</p>
							</a>
						</li>
						<li class="nav-item">
							<a data-toggle="collapse" href="#base">
								<i class="fas fa-layer-group"></i>
								<p>Base</p>
								<span class="caret"></span>
							</a>
							<div class="collapse" id="base">
								<ul class="nav nav-collapse">
									<li>
										<a href="components/avatars.html">
											<span class="sub-item">Avatars</span>
										</a>
									</li>
									<li>
										<a href="components/buttons.html">
											<span class="sub-item">Buttons</span>
										</a>
									</li>
									<li>
										<a href="components/gridsystem.html">
											<span class="sub-item">Grid System</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- End Sidebar -->
		<div class="main-panel">
			<div class="content">
					<div id="menu">
                                <input class="thisInput" id="tab1" type="radio" name="tabs" checked>
                                <label class="thisLabel" for="tab1">Dashboard</label>

                                <input class="thisInput" id="tab2" type="radio" name="tabs">
                                <label class="thisLabel" for="tab2" id="tabPolygon">Polygon</label>  

                                <input class="thisInput" id="tab3" type="radio" name="tabs">
                                <label class="thisLabel" for="tab3" id="tabHistory">History</label>

                                    <section class="thisSection" id="content1">
                                        <div class="data" id="dadosEdificio"></div>  
                                    </section>  
                                    <section class="thisSection" id="content2">
                                        <div id="valueOfh6"></div>
                                    </section>   
                                    <section class="thisSection" id="content3">
                                        <h6>TRANSFERING HISTORY TO HERE <br> UNDER DEVELOPMENT</h6>
                                        <div class="acitemx">
                                            <form>
                                            <div class="row">
                                                    <div class="form-group col-md-8">
                                                        <div id="reportrange" class="form-control pull-right" style="background: #ffff; cursor : pointer; border: 1px solid #ccc ; width: 100%">
                                                            <span></span>
                                                            <b class="caret"></b>
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-md-3">
                                                        <button type="submit" class="btn btn-primary" disabled>Generate</button>
                                                    </div>
                                                    </div>
                                            </form>
                                            <div class="chart" id="chart-room" style="background:#fff"></div>                                        
                                    </section>                                                                                    
                                </div>
                                <div id="maps" class="maps">
                                    <div id="bar">
                                        <button id="pan" title="Pan" class="active"><i
                                                class="fas fa-mouse-pointer"></i></button>
                                        <button id="geolocalizar" title="Geolocalizar"><i
                                                class="far fa-dot-circle"></i></button>
                                        <button id="point" title="Sensor"
                                            <?php if($_SESSION['isAdmin'] == 'false')  echo "hidden" ?>><i
                                                class="fas fa-map-marker-alt"></i></button>
                                        <button id="polygon" title="Polígono"
                                            <?php if($_SESSION['isAdmin'] == 'false')  echo "hidden" ?>><i
                                                class="far fa-building"></i></button>
                                        <button id="modify" title="Modificar"
                                            <?php if($_SESSION['isAdmin'] == 'false') echo "hidden" ?>><i
                                                class="fas fa-draw-polygon"></i></button>
                                       </div>
                                    <div id="buttonMenu" class="buttonMenu">
                                        <button id="toggleMenu" title="Menu" onClick="toggleMenu()"><i
                                                class="fas fa-bars"></i></button>
                                    </div>
                                    <div id="barPiso">
                                        <select id="selectPiso" class="selectPiso">
                                            <option disabled hidden>Piso</option>
                                            <option value="-1">-1</option>
                                            <option selected value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                    <div class="select hide" id="popupSettings" hidden>
                                        <select id="layer-select" class="layer-select" placeholder="Mapa base">
                                            <option value="Aerial">Aérea</option>
                                            <option value="AerialWithLabels">Aérea com ruas</option>
                                            <option value="canvasGray" selected>Cinza</option>
                                            <option value="canvasDark">Dark</option>
                                            <option value="canvasLight">Light</option>
                                        </select>
                                        <div class="select__arrow"></div>
                                        <div id="infor"></div>
                                        <br>
                                    </div>                      
                				</div>
							</div>
			</div>
		</div>
	</div>
	<script src="./assets/js/core/jquery.3.2.1.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="./assets/js/core/popper.min.js"></script>
	<script src="./assets/js/core/bootstrap.min.js"></script>
	<script src="./assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
	<script src="./assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
	<script src="./assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"></script>
	<script src="./assets/js/plugin/datatables/datatables.min.js"></script>
	<script src="./assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js"></script>
	<script src="./assets/js/plugin/sweetalert/sweetalert.min.js"></script>
	<script src="./assets/js/atlantis.min.js"></script>
	<script src="./assets/js/maps/maps.js"></script>
	<script src="./assets/ol/ol.js"></script>
	<script src="./assets/js/maps/ol-ext.js"></script>
	<script src="./assets/js/maps/ol-ext.min.js"></script>
	<script src="./assets/js/ol-popup.js"></script>

<script>
 function toggleMenu() {            
                $('#bar').toggle(250,"linear");
            }
</script>
</body>
</html>