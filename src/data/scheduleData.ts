interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export const schedulesByClass: Record<string, Record<string, ScheduleItem[]>> = {
  '1А': {
    понедельник: [
      { time: '08:00 - 08:40', subject: 'Разговор о важном', teacher: '', room: '2.9' },
      { time: '08:50 - 09:30', subject: 'Русский язык', teacher: '', room: '2.9' },
      { time: '09:50 - 10:30', subject: 'Математика', teacher: '', room: '2.9' },
      { time: '10:50 - 11:30', subject: 'Труд', teacher: '', room: '2.9' },
      { time: '11:45 - 12:25', subject: 'Литературное чтение', teacher: '', room: '2.9' }
    ],
    вторник: [
      { time: '08:00 - 08:40', subject: 'Орлята России', teacher: '', room: '2.9' },
      { time: '08:50 - 09:30', subject: 'Физкультура', teacher: '', room: '' },
      { time: '09:50 - 10:30', subject: 'Русский язык', teacher: '', room: '2.9' },
      { time: '10:50 - 11:30', subject: 'Математика', teacher: '', room: '2.9' },
      { time: '11:45 - 12:25', subject: 'Окружающий мир', teacher: '', room: '2.9' }
    ],
    среда: [
      { time: '08:00 - 08:40', subject: 'Литературное чтение', teacher: '', room: '2.9' },
      { time: '08:50 - 09:30', subject: 'Математика', teacher: '', room: '2.9' },
      { time: '09:50 - 10:30', subject: 'Русский язык', teacher: '', room: '2.9' },
      { time: '10:50 - 11:30', subject: 'Окружающий мир', teacher: '', room: '2.9' },
      { time: '11:45 - 12:25', subject: 'Физкультура', teacher: '', room: '2.9' }
    ],
    четверг: [
      { time: '08:00 - 08:40', subject: 'ФГ', teacher: '', room: '2.9' },
      { time: '08:50 - 09:30', subject: 'Физкультура', teacher: '', room: '' },
      { time: '09:50 - 10:30', subject: 'Русский язык', teacher: '', room: '2.9' },
      { time: '10:50 - 11:30', subject: 'Математика', teacher: '', room: '2.9' },
      { time: '11:45 - 12:25', subject: 'Литература', teacher: '', room: '2.9' }
    ],
    пятница: [
      { time: '08:00 - 08:40', subject: 'Русский язык', teacher: '', room: '2.9' },
      { time: '08:50 - 09:30', subject: 'Литература', teacher: '', room: '2.9' },
      { time: '09:50 - 10:30', subject: 'Музыка', teacher: '', room: '2.9' }
    ]
  },
  '1Б': {
    понедельник: [
      { time: '08:00 - 08:40', subject: 'Разговоры о важном', teacher: '', room: '3.10' },
      { time: '08:50 - 09:30', subject: 'Русский язык', teacher: '', room: '3.10' },
      { time: '09:50 - 10:30', subject: 'Математика', teacher: '', room: '3.10' },
      { time: '10:50 - 11:30', subject: 'Литература', teacher: '', room: '3.10' }
    ],
    вторник: [
      { time: '08:00 - 08:40', subject: 'Орлята России', teacher: '', room: '3.10' },
      { time: '08:50 - 09:30', subject: 'Русский язык', teacher: '', room: '3.10' },
      { time: '09:50 - 10:30', subject: 'Математика', teacher: '', room: '3.9' },
      { time: '10:50 - 11:30', subject: 'Литературное чтение', teacher: '', room: '3.9' },
      { time: '11:45 - 12:25', subject: 'Труд', teacher: '', room: '3.9' }
    ],
    среда: [
      { time: '08:00 - 08:40', subject: 'Русский язык', teacher: '', room: '3.9' },
      { time: '08:50 - 09:30', subject: 'Математика', teacher: '', room: '3.9' },
      { time: '09:50 - 10:30', subject: 'Литературное чтение', teacher: '', room: '3.9' },
      { time: '10:50 - 11:30', subject: 'Физкультура', teacher: '', room: '3.10' },
      { time: '11:45 - 12:25', subject: 'Окружающий мир', teacher: '', room: '3.10' }
    ],
    четверг: [
      { time: '08:00 - 08:40', subject: 'ФГ', teacher: '', room: '3.10' },
      { time: '08:50 - 09:30', subject: 'Музыка', teacher: '', room: '3.10' },
      { time: '09:50 - 10:30', subject: 'Русский язык', teacher: '', room: '3.10' },
      { time: '10:50 - 11:30', subject: 'Физкультура', teacher: '', room: '' },
      { time: '11:45 - 12:25', subject: 'Окружающий мир', teacher: '', room: '3.10' }
    ],
    пятница: [
      { time: '08:00 - 08:40', subject: 'Литературное чтение', teacher: '', room: '3.10' },
      { time: '08:50 - 09:30', subject: 'ИЗО', teacher: '', room: '3.10' },
      { time: '09:50 - 10:30', subject: 'Математика', teacher: '', room: '3.10' },
      { time: '10:50 - 11:30', subject: 'Физкультура', teacher: '', room: '' },
      { time: '11:45 - 12:25', subject: 'Русский язык', teacher: '', room: '3.10' }
    ]
  },
  '1В': {
    понедельник: [
      { time: '08:00 - 08:40', subject: 'Разговор о важном', teacher: '', room: '3.13' },
      { time: '08:50 - 09:30', subject: 'Литературное чтение', teacher: '', room: '3.13' },
      { time: '09:50 - 10:30', subject: 'Математика', teacher: '', room: '3.13' },
      { time: '10:50 - 11:30', subject: 'Труд', teacher: '', room: '3.13' },
      { time: '11:45 - 12:25', subject: 'Русский язык', teacher: '', room: '3.13' }
    ],
    вторник: [
      { time: '08:00 - 08:40', subject: 'Орлята России', teacher: '', room: '3.13' },
      { time: '08:50 - 09:30', subject: 'Математика', teacher: '', room: '3.13' },
      { time: '09:50 - 10:30', subject: 'Физкультура', teacher: '', room: '' },
      { time: '10:50 - 11:30', subject: 'Русский язык', teacher: '', room: '3.13' },
      { time: '11:45 - 12:25', subject: 'Окружающий мир', teacher: '', room: '3.13' }
    ],
    среда: [
      { time: '08:00 - 08:40', subject: 'Математика', teacher: '', room: '3.13' },
      { time: '08:50 - 09:30', subject: 'Русский язык', teacher: '', room: '3.13' },
      { time: '09:50 - 10:30', subject: 'Музыка', teacher: '', room: '3.13' },
      { time: '10:50 - 11:30', subject: 'Окружающий мир', teacher: '', room: '3.13' },
      { time: '11:45 - 12:25', subject: 'Литературное чтение', teacher: '', room: '3.13' }
    ],
    четверг: [
      { time: '08:00 - 08:40', subject: 'ФГ', teacher: '', room: '3.13' },
      { time: '08:50 - 09:30', subject: 'Математика', teacher: '', room: '3.13' },
      { time: '09:50 - 10:30', subject: 'Русский язык', teacher: '', room: '3.13' },
      { time: '10:50 - 11:30', subject: 'Литературное чтение', teacher: '', room: '3.13' },
      { time: '11:45 - 12:25', subject: 'Физкультура', teacher: '', room: '3.13' }
    ],
    пятница: [
      { time: '08:00 - 08:40', subject: 'Русский язык', teacher: '', room: '3.13' },
      { time: '08:50 - 09:30', subject: 'Физкультура', teacher: '', room: '' },
      { time: '09:50 - 10:30', subject: 'ИЗО', teacher: '', room: '3.13' },
      { time: '10:50 - 11:30', subject: 'Литературное чтение', teacher: '', room: '3.13' }
    ]
  },
  '5А': {
    понедельник: [
      { time: '08:00 - 08:40', subject: 'РазвОР', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '08:50 - 09:30', subject: 'Биология', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Рус.яз', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '11:45 - 12:25', subject: 'История', teacher: 'Блинова Н.Г.', room: '13' },
      { time: '12:40 - 13:20', subject: '', teacher: '', room: '' },
      { time: '13:30 - 14:10', subject: 'Физ-ра', teacher: '', room: '13' }
    ],
    вторник: [
      { time: '08:00 - 08:40', subject: 'География', teacher: 'Юстинова О.А.', room: '13' },
      { time: '08:50 - 09:30', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Рус.яз', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Лит-т', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '11:45 - 12:25', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '12:40 - 13:20', subject: 'Физ-ра', teacher: '', room: '13' }
    ],
    среда: [
      { time: '08:00 - 08:40', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '08:50 - 09:30', subject: 'Рус.яз', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Биология', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Музыка', teacher: '', room: '22' },
      { time: '11:45 - 12:25', subject: 'История', teacher: 'Блинова Н.Г.', room: '13' },
      { time: '12:40 - 13:20', subject: 'Труд', teacher: '', room: '13' }
    ],
    четверг: [
      { time: '08:00 - 08:40', subject: 'Физ-ра', teacher: '', room: '13' },
      { time: '08:50 - 09:30', subject: 'Рус.яз', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Лит-т', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '11:45 - 12:25', subject: 'ИЗО', teacher: 'Кулакова О.А.', room: '13' },
      { time: '12:40 - 13:20', subject: 'Лит-т', teacher: 'Кулакова Е.В.', room: '13' }
    ],
    пятница: [
      { time: '08:00 - 08:40', subject: 'Лит-т', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '08:50 - 09:30', subject: 'Рус.яз', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'ОБЖ', teacher: 'Юстинова О.А.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '11:45 - 12:25', subject: 'География', teacher: 'Юстинова О.А.', room: '13' }
    ]
  },
  '5Б': {
    понедельник: [
      { time: '08:00 - 08:40', subject: 'РазвОР', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '08:50 - 09:30', subject: 'История', teacher: 'Блинова Н.Г.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Рус.яз', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Музыка', teacher: '', room: '22' },
      { time: '11:45 - 12:25', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '12:40 - 13:20', subject: 'Биология', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '13:30 - 14:10', subject: 'ИЗО', teacher: 'Кулакова О.А.', room: '13' }
    ],
    вторник: [
      { time: '08:00 - 08:40', subject: 'История', teacher: 'Блинова Н.Г.', room: '13' },
      { time: '08:50 - 09:30', subject: 'Рус.яз', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Рус.яз', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '11:45 - 12:25', subject: 'Биология', teacher: 'Кулакова Е.В.', room: '13' },
      { time: '12:40 - 13:20', subject: 'Труд', teacher: '', room: '14' }
    ],
    среда: [
      { time: '08:00 - 08:40', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '08:50 - 09:30', subject: 'Рус.яз', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Физ-ра', teacher: '', room: '13' },
      { time: '10:50 - 11:30', subject: 'Лит-т', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '11:45 - 12:25', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '12:40 - 13:20', subject: 'География', teacher: 'Юстинова О.А.', room: '13' }
    ],
    четверг: [
      { time: '08:00 - 08:40', subject: 'Физ-ра', teacher: '', room: '13' },
      { time: '08:50 - 09:30', subject: 'Лит-т', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Физ-ра', teacher: '', room: '13' },
      { time: '11:45 - 12:25', subject: 'Рус.яз', teacher: 'Лебедева Е.В.', room: '13' }
    ],
    пятница: [
      { time: '08:00 - 08:40', subject: 'География', teacher: 'Юстинова О.А.', room: '13' },
      { time: '08:50 - 09:30', subject: 'Лит-т', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '09:50 - 10:30', subject: 'Матем', teacher: 'Кулакова А.М.', room: '13' },
      { time: '10:50 - 11:30', subject: 'Лит-т', teacher: 'Лебедева Е.В.', room: '13' },
      { time: '11:45 - 12:25', subject: 'ОБЖ', teacher: 'Юстинова О.А.', room: '13' }
    ]
  }
};

export const classes = [
  '1А', '1Б', '1В', '1Г', '1Д', '1Е', '1Ж',
  '2А', '2Б', '2В', '2Г', '2Д', '2Е',
  '3А', '3Б', '3В', '3Г', '3Д', '3Е',
  '4А', '4Б', '4В', '4Г', '4Д', '4Е',
  '5А', '5Б', '5В', '5Г', '5Д', '5Е',
  '6А', '6Б', '6В', '6Г', '6Д', '6Е',
  '7А', '7Б', '7В', '7Г', '7Д', '7Е',
  '8А', '8Б', '8В', '8Г', '8Д', '8Е',
  '9А', '9Б', '9В', '9Г', '9Д', '9Е',
  '10А', '10Б', '11А', '11Б'
];

export const bellSchedule = [
  { lesson: 1, time: '08:00 - 08:40', break: '10 мин' },
  { lesson: 2, time: '08:50 - 09:30', break: '20 мин' },
  { lesson: 3, time: '09:50 - 10:30', break: '20 мин' },
  { lesson: 4, time: '10:50 - 11:30', break: '15 мин' },
  { lesson: 5, time: '11:45 - 12:25', break: '15 мин' },
  { lesson: 6, time: '12:40 - 13:20', break: '10 мин' },
  { lesson: 7, time: '13:30 - 14:10', break: '15 мин' },
  { lesson: 8, time: '14:25 - 15:05', break: '15 мин' },
  { lesson: 9, time: '15:20 - 16:00', break: '10 мин' },
  { lesson: 10, time: '16:10 - 16:50', break: '10 мин' },
  { lesson: 11, time: '17:00 - 17:40', break: '10 мин' },
  { lesson: 12, time: '17:50 - 18:30', break: '' }
];