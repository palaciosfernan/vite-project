import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Administrador from '../templates/Administrador';


const DragAndDropCalendar = withDragAndDrop(Calendar);

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/citaAgendadas/');
        const data = await response.json();

        const formattedEvents = data.map(cita => ({
          id: cita.Id_Paciente.toString(),
          title: `${cita.nombre} ${cita.apellidos}`,
          start: new Date(cita.fecha),
          end: new Date(cita.fecha),
          // Puedes agregar más propiedades según tus necesidades
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEventDrop = async (event) => {
    try {
      const response = await fetch('http://localhost:8080/api/citaAgendadas/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_Paciente: event.id,
          start: event.start,
          end: event.end,
        }),
      });

      if (response.ok) {
        console.log('Evento actualizado en la base de datos:', event);
      } else {
        console.error('Error al actualizar el evento en la base de datos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const previewEvent = {
    id: '1',
    title: 'Evento de prueba',
    start: new Date(),
    end: new Date(),
  };

  moment.locale('es');

  const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
  };

  return (
    <>
      <Administrador></Administrador>
      <div  className="col-10"
          style={{
            height: "calc(100vh - 125px)",
            overflowY: "auto",
            paddingRight: "12px",
          }} >
        {loading ? (
          <p>Cargando eventos...</p>
        ) : events.length === 0 ? (
          <div>
            <p>No hay eventos para mostrar.</p>
            <DragAndDropCalendar
              selectable
              events={[previewEvent]}
              onEventDrop={handleEventDrop}
              defaultView={Views.WEEK}
              defaultDate={new Date()}
              localizer={momentLocalizer(moment)}
              messages={messages}
            />
          </div>
        ) : (
          <DragAndDropCalendar
            selectable
            events={events}
            onEventDrop={handleEventDrop}
            defaultView={Views.MONTH}
            defaultDate={new Date()}
            localizer={momentLocalizer(moment)}
            messages={messages}
          />
        )}
      </div>
    </>
  );
};

export default Calendario;
