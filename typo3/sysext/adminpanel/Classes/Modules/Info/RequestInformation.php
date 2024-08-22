<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace TYPO3\CMS\Adminpanel\Modules\Info;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Adminpanel\ModuleApi\AbstractSubModule;
use TYPO3\CMS\Adminpanel\ModuleApi\DataProviderInterface;
use TYPO3\CMS\Adminpanel\ModuleApi\ModuleData;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\View\ViewFactoryData;
use TYPO3\CMS\Core\View\ViewFactoryInterface;

/**
 * RequestInformation submodule of the admin panel
 *
 * @internal
 */
class RequestInformation extends AbstractSubModule implements DataProviderInterface
{
    public function getIdentifier(): string
    {
        return 'info-request';
    }

    public function getLabel(): string
    {
        return $this->getLanguageService()->sL(
            'LLL:EXT:adminpanel/Resources/Private/Language/locallang_info.xlf:sub.request.label'
        );
    }

    public function getDataToStore(ServerRequestInterface $request): ModuleData
    {
        return new ModuleData(
            [
                'post' => $request->getParsedBody(),
                'get' => $request->getQueryParams(),
                'cookie' => $request->getCookieParams(),
                'session' => $_SESSION ?? null,
                'server' => $request->getServerParams(),
            ]
        );
    }

    public function getContent(ModuleData $data): string
    {
        $viewFactoryData = new ViewFactoryData(
            templateRootPaths: ['EXT:adminpanel/Resources/Private/Templates'],
            partialRootPaths: ['EXT:adminpanel/Resources/Private/Partials'],
            layoutRootPaths: ['EXT:adminpanel/Resources/Private/Layouts'],
        );
        $viewFactory = GeneralUtility::makeInstance(ViewFactoryInterface::class);
        $view = $viewFactory->create($viewFactoryData);
        $view->assignMultiple($data->getArrayCopy());
        $view->assign('languageKey', $this->getBackendUser()->user['lang'] ?? null);
        return $view->render('Modules/Info/RequestInformation');
    }
}
