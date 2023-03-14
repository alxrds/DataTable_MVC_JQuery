<?php

    namespace App\Controller;

    use App\View\View;
    use App\Entity\Book;
    use App\DB\Connection;

    class BookController 
    {
        public function index()
        { 
            $connection = Connection::getInstance();
            $view = new View('book/book.phtml');
            $view->books = (new Book($connection))->findAll();
            return $view->render();
        }

        public function new()
        {
            $connection = Connection::getInstance();
            if($_POST){
                $data = $_POST;
                $book = new Book($connection);
                $success = $book->insert($data);
                if($success){
                    return 1;
                }else{
                    return 0;
                }
            }
        }

        public function list()
        {   $connection = Connection::getInstance();
            $json = (new Book($connection))->findAll();
            return json_encode($json, JSON_UNESCAPED_UNICODE);
        }

        public function remove($id)
        {   
            $connection = Connection::getInstance();
            $book = new Book($connection);
            $success = $book->delete($id);
            if($success){
                return 3;
            }else{
                return 0;
            }
        }

        public function drop($id)
        {   
            $data = $_POST;
            $id = $data['id'];
            $connection = Connection::getInstance();
            $book = new Book($connection);
            $success = $book->update($data);
            if($success){
                return 4;
            }else{
                return 0;
            }
        }
    }