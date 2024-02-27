package services

import (
	"context"
	"time"
)

type City struct {
	ID				string `json:"id"`
	Name			string `json:"name"`
	UserId		string `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CityPayload struct {
	Name			string		`json:"name"`
	UserId		string		`json:"user_id"`
}

type CitiesList struct {
	Cities []City `json:"cities"`
}

func (c *City) GetAllCities() ([]*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, name, user_id, created_at, updated_at FROM cities`
	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	var cities []*City
	for rows.Next() {
		var city City
		err := rows.Scan(
			&city.ID,
			&city.Name,
			&city.UserId,
			&city.CreatedAt,
			&city.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		cities = append(cities, &city)
	}
	return cities, nil
}

func (c *City) GetCityByID(id string) (*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, user_id, name, created_at, updated_at FROM cities WHERE id = $1`
	row := db.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&c.ID,
		&c.Name,
		&c.UserId,
		&c.CreatedAt,
		&c.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return c, nil
}

func (c * City) CreateCity(city City) (*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `INSERT INTO cities (user_id, name, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id`
	err := db.QueryRowContext(ctx, query, city.UserId, city.Name, time.Now(), time.Now()).Scan(&city.ID)
	if err != nil {
		return nil, err
	}
	return &city, nil
}

func (c *City) UpdateCity(id string, city City) (*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `UPDATE cities SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id, user_id, name, created_at, updated_at`
	err := db.QueryRowContext(ctx, query, city.Name, time.Now(), id).Scan(&city.ID, &city.UserId, &city.Name, &city.CreatedAt, &city.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &city, nil
}

func (c *City) DeleteCity(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `DELETE FROM cities WHERE id = $1`
	_, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}

func (c *City) GetCityByUserId(id string) (*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, user_id, name, created_at, updated_at FROM cities WHERE user_id = $1`
	row := db.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&c.ID,
		&c.UserId,
		&c.Name,
		&c.CreatedAt,
		&c.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return c, nil
}