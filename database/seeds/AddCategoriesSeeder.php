<?php

use App\Models\Category;
use Illuminate\Database\Seeder;

class AddCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if ($this->command->confirm('Clear categories table? [y/n]')) {
            try {
                DB::table('categories')->delete();
                $this->command->info('Categories table clear... ok');
            } catch (Illuminate\Database\QueryException $e) {
                $this->command->error('Error! Perhaps the category with something related?');
            }
        }

        if ($this->command->confirm('Add categories? [y/n]')) {
            Category::insert([
                ['name' => 'Все для дома'],
                ['name' => 'Рестораны и кафе'],
                ['name' => 'Перевод с карты'],
                ['name' => 'Транспорт'],
                ['name' => 'Супермаркеты']
            ]);
            $this->command->info('Categories added... ok');
        }

    }
}
