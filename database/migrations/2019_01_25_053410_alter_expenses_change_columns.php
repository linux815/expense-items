<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterExpensesChangeColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::table('expenses', function (Blueprint $table) {
            $table->string('comment', 500)->nullable()->change();
            $table->dateTime('expensed_at')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::table('expenses', function (Blueprint $table) {
            $table->string('comment', 500)->nullable(false)->change();
            $table->dateTime('expensed_at')->nullable()->change();
        });
    }
}
