#Create User Table
USE petshop;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_session_id` varchar(100) NOT NULL,
   PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

  
#Insert Users
INSERT INTO `user` (`user_email`, `user_password`, `user_session_id`) VALUES
( 'user_session_iduser_emailuser_session_idjohnsmith@gmail.com', 'password', ''),
( 'peterparker@gmail.com', 'password', '');
