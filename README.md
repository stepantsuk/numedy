для запуска

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Общие эмоции : Сделал на тайп скрипт (на собесе говорили, что начинаете на нем работать), тестовое не маленькое, старался, чтобы стили и верстка не резала глаза. Опыт с редакс тулкит небольшой, основной опыт на мобыксе, но вроде справился. Не могу сказать, что было изи, но в целом обычный таск... Также по стилям в основном работал со стайлед компонентс, показалось, что с ними удобнее работать по условной стилизации элементов. Сори если где то комменты оставил или че то можно было зарефачить получше - спешил, т.к. есть дедлайн по тестовому.

Готов обсудить реализацию на созвоне. 

Описание тестового, сразу буду под пунктами приводить свои комменты
Задание
Требуется написать приложение “Список задач”.
Приложение должно соответствовать следующим требованиям (пункты отмеченные (\*)
необязательны к выполнению, но их выполнение будет плюсом):
ー Приложение позволяет добавлять/удалять/редактировать задачи;
// Выполнено

ー У каждой задачи должны быть следующие параметры: заголовок, флаг выполнена или нет,
дата начала, дата конца и описание;
// Выполнено

ー Даты должны выводиться в формате “5 фев 2022 г.”;
// Выполнено частично, на странице редактирования задачи/добавления новой это не соблюдается (не хватило времени для этой реализации)

ー Задачи отображаются на главной странице в порядке их добавления в виде списка с
пагинацией.
// Выполнено

По достижению конца страницы добавляются новые данные,
// Тут не понял, что требуется, не выполнено, я так понимаю, что смысл в именно динамичной подгрузке "условно с бека", в пет проекте делал такое, на практике нет (был только опыт с показать еще, когда подгружается следующая порция)

а по достижению концасписка задач отображается надпись “Конец списка”. На одной странице отображаются 15 задач;
// Выполнено. ОБРАЩАЮ ВНИМАНИЕ, что я изменил 15 на 5, чтобы быстрее включилась пагинация

ー Задачи на главной странице можно фильтровать по всем параметрам, кроме описания. После
изменения параметров фильтрации пагинация сбрасывается, т.е. отображается только первая
страница;
// Выполнено. Но немного костыльно, тк цели сортировки имеют разную типизацию, это надо учитывать, я сделал упрощенный вариант через sortBy lodash

ー Добавление и редактирование происходит на отдельной странице.
// Выполнено.

ー Удаление задачи происходит на главном экране после подтверждения, вызывается алерт “Вы
действительно хотите удалить задачу?”;
// Выполнено. Прикрутил алерты на все кнопки, а не только удалить

ー Флаг “Выполнена” у задачи можно изменить только на главной странице;
// Выполнено.

ー Все данные о задачах сохраняются в LocalStorage и загружаются оттуда при открытии
приложения;
// Выполнено.

ー Все страницы должны быть сверстаны на flex. Верстка должна быть адаптирована под все
устройства;
// Выполнено. до 400 пикселей все адекватно отображается

// на остальное не хватило времени
ー (_) Удаленные задачи должны отображаться на отдельной странице / в отдельном блоке
“Корзина”. Список удаленных задач можно очистить;
ー (_) На всех страницах должна отображаться информация о состоянии синхронизации с
LocalStorage, сымитировать задержку синхронизации в 500мс;
ー (_) Данные должны синхронизироваться с LocalStorage не чаще чем раз в 300мс;
ー (_) В случае ошибки синхронизации (происходит в 50% случаях, необходимо сымитировать)
необходимо уведомить об этом пользователя. Пользователь должен иметь возможность
повторить синхронизацию при сбое;
Технологии
Список библиотек, которые необходимо использовать:
ー React
ー Redux
Результат
Результат выполнения тестового задания загрузить в открытый репозиторий на гитхабе. В README
указать комментарии о выполненной работе (что сделано, особенности реализации, особенности
работы приложения, баги, что, почему и как сделано, что новое узнали). Гит история должна быть
чистой и читабельной (желательно).
