// Ждем, пока страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('programsGrid');
    const searchInput = document.getElementById('searchInput');
    
    // Функция отрисовки
    function render(searchTerm = '') {
        grid.innerHTML = ''; // Очищаем текущий список
        
        let foundCount = 0;

        // Проходим по всем университетам
        universitiesData.forEach(uni => {
            // Фильтруем программы внутри университета
            const matchingPrograms = uni.programs.filter(prog => {
                const searchLower = searchTerm.toLowerCase();
                return prog.nameRu.toLowerCase().includes(searchLower) || 
                       prog.nameSk.toLowerCase().includes(searchLower) ||
                       uni.university.toLowerCase().includes(searchLower);
            });

            // Если есть совпадения, рисуем карточки
            matchingPrograms.forEach(prog => {
                foundCount++;
                const card = document.createElement('div');
                card.className = 'glass-card rounded-2xl p-6 flex flex-col justify-between h-full cursor-pointer';
                
                card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-start mb-3">
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">
                                ${prog.level}
                            </span>
                            <span class="text-xs text-slate-500 font-medium">${prog.price}</span>
                        </div>
                        <h3 class="text-lg font-bold text-slate-800 leading-tight mb-1">${prog.nameRu}</h3>
                        <p class="text-sm text-slate-500 italic mb-4">${prog.nameSk}</p>
                        
                        <div class="border-t border-slate-200/50 pt-3 mt-2">
                            <div class="flex items-center gap-2 mb-1">
                                <div class="w-1 h-4 bg-blue-500 rounded-full"></div>
                                <p class="text-xs font-semibold text-slate-700 truncate">${uni.university}</p>
                            </div>
                            <p class="text-xs text-slate-500 pl-3 truncate">${uni.faculty}</p>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        });

        // Обновляем счетчик
        document.getElementById('resultText').innerText = `Найдено программ: ${foundCount}`;
    }

    // Слушаем ввод в поиск
    searchInput.addEventListener('input', (e) => {
        render(e.target.value);
    });

    // Запуск при старте
    render();
});