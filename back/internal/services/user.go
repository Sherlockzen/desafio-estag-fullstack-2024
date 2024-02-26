package services

import (
	"context"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
    ID        string 	`json:"id"`
		UserName	string	`json:"user_name"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    Password  string    `json:"-"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}
type UserPayload struct {
	UserName string `json:"user_name"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
type UsersList struct {
	Users []User `json:"users"`
}

func (u *User) GetAllUsers() ([]*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, user_name, name, email, created_at, updated_at FROM users`
	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	var users []*User
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.UserName,
			&user.Name,
			&user.Email,
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}
	return users, nil
}

func (u *User) GetUserByID(id string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, user_name, name, email, created_at, updated_at FROM users WHERE id = $1`
	row := db.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&u.ID,
		&u.UserName,
		&u.Name,
		&u.Email,
		&u.CreatedAt,
		&u.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (u *User) CreateUser(user User) (*User, error) {
    ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
    defer cancel()

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return nil, err
    }

    query := `INSERT INTO users (user_name, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, user_name, name, email, created_at, updated_at`
    err = db.QueryRowContext(ctx, query, user.UserName, user.Name, user.Email, hashedPassword, time.Now(), time.Now()).Scan(&user.ID, &user.UserName, &user.Name, &user.Email, &user.CreatedAt, &user.UpdatedAt)
    if err != nil {
        return nil, err
    }
    user.Password = "" // Clear the password before returning
    return &user, nil
}

func (u *User) UpdateUser(id string, body User) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `UPDATE users SET user_name = $1, name = $2, email = $3, updated_at = $4 WHERE id = $5`
	_, err := db.ExecContext(ctx, query, body.UserName, body.Name, body.Email, time.Now(), id)
	if err != nil {
		return  nil, err
	}
	return &body,nil
}

func (u *User) DeleteUser(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `DELETE FROM users WHERE id = $1`
	_, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}