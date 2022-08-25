package emarket.backend.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import emarket.backend.model.BasicUser;
import emarket.backend.model.User;
import emarket.backend.repository.UserRepository;

@org.springframework.stereotype.Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	// getting all driving licenses by using the method findaAll() of CrudRepository
	public List<User> getUsers() {
		List<User> users = new ArrayList<User>();
		userRepository.findAll().forEach(user -> users.add(user));
		return users;
	}

	public List<BasicUser> getBasicUsers() {
		List<BasicUser> basicUsers = new ArrayList<BasicUser>();
		userRepository.findAll().forEach(user -> basicUsers
				.add(new BasicUser(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName())));
		return basicUsers;
	}

	// getting a specific driving license by using the method findById() of
	// CrudRepository
	public User getUserById(int id) {
//		return drivingLicenseRepository.findById(id).get();
		return userRepository.findOne(id);
	}

	// saving a specific driving license by using the method save() of
	// CrudRepository
	public User saveOrUpdate(User user) {
		return userRepository.save(user);
	}

	// deleting a specific driving license by using the method deleteById() of
	// CrudRepository
	public void delete(int id) {
		userRepository.delete(id);
	}

	// updating a driving license by using the method save() of CrudRepository
	public void update(User user, String username) {
		user.setUsername(username);
		userRepository.save(user);
	}
	
	public User authenticate(String username, String password) {
		List<User> users = getUsers();
		userRepository.findAll().forEach(user -> users.add(user));
		for (User user : users) {
			if ( user.getUsername().equals(username) && user.getPassword().equals(password) ) {
				return user;
			}
		}
		return null;
	}

}
