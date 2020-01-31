<?php

namespace App\Controller;

use App\Entity\Soldier;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;

class ReportsController extends AbstractController
{
    /**
     * @Route("/reports", name="reports")
     */
    public function index()
    {
        return $this->render('reports/index.html.twig', [
            'controller_name' => 'ReportsController',
        ]);
    }

    /**
     * @Route("/reports/first", name="default")
     */
    public function first()
    {
        $entityManager=$this->getDoctrine()->getManager();
        $soldiers_rep=$entityManager->getRepository(Soldier::class);
        $soldiers=$soldiers_rep->findAll();
        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'dejavu serif');
        $pdfOptions->set('dpi', '1200');
        $dompdf = new Dompdf($pdfOptions);
        $html = $this->renderView('reports/first.html.twig', [
            'soldiers'=>$soldiers
        ]);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        file_put_contents('../mypdf.pdf',$dompdf->output());
        $response = new BinaryFileResponse('../mypdf.pdf');
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT);

        return $response;
    }
}
