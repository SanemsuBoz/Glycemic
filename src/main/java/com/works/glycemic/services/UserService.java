package com.works.glycemic.services;

import com.works.glycemic.models.Role;
import com.works.glycemic.models.User;
import com.works.glycemic.repositories.RoleRepository;
import com.works.glycemic.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService extends SimpleUrlLogoutSuccessHandler implements UserDetailsService {

    final RoleRepository rRepo;
    final UserRepository uRepo;

    public UserService(RoleRepository rRepo, UserRepository uRepo) {
        this.rRepo = rRepo;
        this.uRepo = uRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails userDetails=null;
        Optional<User> oUser=uRepo.findByEmailEqualsIgnoreCase(email);
        if (oUser.isPresent()){
            User u=oUser.get();
            userDetails=new org.springframework.security.core.userdetails.User(
                    u.getEmail(),
                    u.getPassword(),
                    u.isEnabled(),
                    u.isTokenExpired(),
                    true,
                    true,
                    getAuthorities(u.getRoles())
            );
            return  userDetails;
        }
        throw  new UsernameNotFoundException("User name not found!");
    }

    private List<GrantedAuthority> getAuthorities (List<Role> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority( role.getName() ));
        }
        return authorities;
    }

    public User register( User us ) throws AuthenticationException {

        Optional<User> uOpt = uRepo.findByEmailEqualsIgnoreCase(us.getEmail());
        if ( uOpt.isPresent() ) {
            return null;
        }
        us.setPassword( encoder().encode( us.getPassword() ) );

        return uRepo.save(us);
    }


    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }



    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        super.onLogoutSuccess(request, response, authentication);

    }

    //user register service
    public User userRegisterService(User user){

        //user control
        Optional<User> optionalUser=uRepo.findByEmailEqualsIgnoreCase(user.getEmail());
        if (optionalUser.isPresent()){
            return null;
        }else{
            //register action
            Optional<Role> oRole=rRepo.findById(2L);
            if (oRole.isPresent()){
                //register
                List<Role> roles=new ArrayList<>();
                Role r=oRole.get();
                roles.add(r);
                user.setRoles(roles);
                user.setEnabled(true);
                user.setTokenExpired(true);
                //email send-> enabled false
                return register(user);
            }

        }
        return null;
    }

    public User adminRegisterService(User user){

        //user control
        Optional<User> optionalUser=uRepo.findByEmailEqualsIgnoreCase(user.getEmail());
        if (optionalUser.isPresent()){
            return null;
        }else{
            //register action
            Optional<Role> oRole=rRepo.findById(1L);
            if (oRole.isPresent()){
                //register
                user.setRoles(rRepo.findAll());
                //email send-> enabled false
                return register(user);
            }

        }
        return null;
    }

    //login with sec
    public User login(String email) {
        Optional<User> optionalUser = uRepo.findByEmailEqualsIgnoreCase(email);
        if (optionalUser.isPresent()) {
            User user=optionalUser.get();
            return user;
        }
        return null;
    }
}
