package services

import (
	"context"
	"time"
)

type Day struct {
	Id					string `json:"id"`
	DaysWeek 		string `json:"days_week"`
	UserId			string `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type DaysPayload struct {
	DaysWeek		string 		`json:"days_week"`
	UserId			string 		`json:"user_id"`
}

type DaysList struct {
	Days []Day	`json:"days"`
}

func (d *Day) GetAllDays() ([]*Day, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, days_week, user_id, created_at, updated_at FROM days`
	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	var days []*Day
	for rows.Next() {
		var day Day
		err := rows.Scan(
			&day.Id,
			&day.DaysWeek,
			&day.UserId,
			&day.CreatedAt,
			&day.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		days = append(days, &day)
	}
	return days, nil
}

func (d *Day) GetDayByID(id string) (*Day, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, user_id, days_week, created_at, updated_at FROM days WHERE id = $1`
	row := db.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&d.Id,
		&d.DaysWeek,
		&d.UserId,
		&d.CreatedAt,
		&d.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return d, nil
}


func (d * Day) CreateDay(day Day) (*Day, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `INSERT INTO days (user_id, days_week, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id`
	err := db.QueryRowContext(ctx, query, day.UserId, day.DaysWeek, time.Now(), time.Now()).Scan(&day.Id)
	if err != nil {
		return nil, err
	}
	return &day, nil
}

func (d *Day) UpdateDay(id string, day Day) (*Day, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `UPDATE days SET days_week = $1, updated_at = $2 WHERE id = $3 RETURNING id, user_id, days_week, created_at, updated_at`
	err := db.QueryRowContext(ctx, query, day.DaysWeek, time.Now(), id).Scan(&day.Id, &day.UserId, &day.DaysWeek, &day.CreatedAt, &day.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &day, nil
}

func (d *Day) DeleteDay(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `DELETE FROM days WHERE id = $1`
	_, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}

func (d *Day) GetDaysByUserId(id string) ([]*Day, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, user_id, days_week, created_at, updated_at FROM days WHERE user_id = $1`
	rows, err := db.QueryContext(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var days []*Day
	for rows.Next() {
		var day Day
		err := rows.Scan(
			&day.Id,
			&day.UserId,
			&day.DaysWeek,
			&day.CreatedAt,
			&day.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		days = append(days, &day)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return days, nil
}