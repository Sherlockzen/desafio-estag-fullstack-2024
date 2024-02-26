package controllers

import (
	"challenge-api/internal/helpers"
	"challenge-api/internal/services"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
)

var city services.City

func GetAllCities(w http.ResponseWriter, r *http.Request) {
	cities, err := city.GetAllCities()
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error getting all cities: ", err)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"cities": cities}, nil)
}

func GetCityById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	city, err := city.GetCityByID(id)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error getting city by id: ", err)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"city": city}, nil)
}

func CreateCity(w http.ResponseWriter, r *http.Request) {
	var cityData services.City
	err := json.NewDecoder(r.Body).Decode(&cityData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error parsing city: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	cityCreated, err := city.CreateCity(cityData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error creating city: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	helpers.WriteJSON(w, http.StatusCreated, helpers.Envelop{"post": cityCreated}, nil)
}

func UpdateCity(w http.ResponseWriter, r *http.Request)  {
	var cityData services.City
	id := chi.URLParam(r, "id")
	err := json.NewDecoder(r.Body).Decode(&cityData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error parsing city: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	cityUpdated, err := city.UpdateCity(id, cityData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error updating city: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"city": cityUpdated}, nil)
}

func DeleteCity(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	err := city.DeleteCity(id)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error deleting city: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"city": "deleted"}, nil)
}

func GetCitiesByUserId(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	city, err := city.GetCityByUserId(id)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error getting city by user id: ", err)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"city": city}, nil)
}