package controllers

import (
	"challenge-api/internal/helpers"
	"challenge-api/internal/services"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
)

var day services.Day

func GetAllDays(w http.ResponseWriter, r *http.Request) {
	days, err := day.GetAllDays()
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error getting all days: ", err)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"days": days}, nil)
}

func GetDayById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	day, err := day.GetDayByID(id)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error getting day by id: ", err)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"day": day}, nil)
}

func CreateDay(w http.ResponseWriter, r *http.Request) {
	var dayData services.Day
	err := json.NewDecoder(r.Body).Decode(&dayData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error parsing city: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	dayCreated, err := day.CreateDay(dayData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error creating city: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	helpers.WriteJSON(w, http.StatusCreated, helpers.Envelop{"day": dayCreated}, nil)
}

func UpdateDay(w http.ResponseWriter, r *http.Request)  {
	var dayData services.Day
	id := chi.URLParam(r, "id")
	err := json.NewDecoder(r.Body).Decode(&dayData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error parsing day: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	dayUpdated, err := day.UpdateDay(id, dayData)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error creating day: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	helpers.WriteJSON(w, http.StatusCreated, helpers.Envelop{"day": dayUpdated}, nil)
}


func DeleteDay(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	err := day.DeleteDay(id)
	if err != nil {
		helpers.MessageLogs.ErrorLog.Println("Error deleting day: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	helpers.WriteJSON(w, http.StatusOK, helpers.Envelop{"day": "deleted"}, nil)
}